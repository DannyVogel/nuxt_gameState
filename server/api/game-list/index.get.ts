import { DbController } from "../../controllers/db.controller";
import { GameListController } from "../../controllers/gameList.controller";

type QueryParams = {
  page?: string;
  limit?: string;
  list?: "toPlay" | "played";
  status?: string;
  search?: string;
  sort?: string;
  year?: string;
  hasComments?: string;
};

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event).catch((error) => {
    console.error("Error requiring user session:", error);
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "User not logged in",
    });
  });
  try {
    const query = getQuery(event) as QueryParams;
    const page = parseInt(query.page || "1");
    const limit = parseInt(query.limit || "10");
    const list = query.list;
    const status = query.status;
    const search = query.search;
    const sort = (query.sort?.toUpperCase() || "DESC") as "ASC" | "DESC";
    const year = query.year ? parseInt(query.year) : undefined;
    const hasComments = query.hasComments
      ? query.hasComments === "true"
      : undefined;

    const fullList = (await DbController.getGameList(session.user.sub)) || [];

    let filteredList = GameListController.filterByList(fullList, list, sort);
    filteredList = GameListController.applyFilters(
      filteredList,
      status,
      search,
      year,
      hasComments
    );

    const { items: paginatedList, pagination } =
      GameListController.getPaginatedResults(filteredList, page, limit);

    const payload = {
      gameList: paginatedList,
      pagination,
      counts: {
        gamesToPlay: fullList.filter((game) => game.status === "toPlay").length,
        gamesPlayed: fullList.filter((game) =>
          ["beat", "dropped", "playing"].includes(game.status)
        ).length,
      },
    };

    return {
      statusCode: 200,
      statusMessage: "Ok",
      payload,
      message: "Game list retrieved",
    };
  } catch (error: any) {
    console.error("Error getting game list:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: error.message,
    });
  }
});
