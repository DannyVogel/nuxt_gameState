import { DbController } from "~/server/controllers/db.controller";
import { GameListController } from "~/server/controllers/gameList.controller";

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
    const query = getQuery(event);
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const list = query.list as "toPlay" | "played";
    const status = query.status as string;
    const search = query.search as string;

    const fullList = (await DbController.getGameList(session.user.sub)) || [];

    let filteredList = GameListController.filterByList(fullList, list);
    filteredList = GameListController.applyFilters(
      filteredList,
      status,
      search
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
