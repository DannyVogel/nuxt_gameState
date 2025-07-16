import { getToken } from "../../services/tokenManagers/igdb";
import { GameDTO } from "../../utils/gameState.class";
import { DbController } from "../../controllers/db.controller";
import { GameListController } from "../../controllers/gameList.controller";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event).catch((error) => {
    console.error("Error requiring user session:", error);
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "User not logged in",
    });
  });
  const config = useRuntimeConfig();
  const IGDBClientId = config.IGDBClientId;
  const idParam = getRouterParam(event, "id");

  if (!idParam)
    throw createError({ statusCode: 400, message: "ID parameter is required" });

  const ids = idParam
    .split(",")
    .map((id) => parseInt(id.trim()))
    .filter((id) => !isNaN(id));

  if (ids.length === 0) {
    throw createError({ statusCode: 400, message: "Invalid ID format" });
  }

  const token = await getToken();
  const response = await $fetch<Promise<SearchResponse>>(
    "https://api.igdb.com/v4/games",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": IGDBClientId,
        Authorization: `Bearer ${token}`,
      },
      body: `fields slug, name, id, genres.name, first_release_date, screenshots.image_id, artworks.image_id, platforms.name; where id = (${ids.join(
        ","
      )});`,
    }
  ).catch((error) => {
    console.error("error", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: error.message,
    });
  });

  if (Array.isArray(response)) {
    if (response.length === 0) {
      throw createError({ statusCode: 404, message: "No games found" });
    } else {
      const games = response.map((game) => new GameDTO(game));
      games.forEach((game) => {
        DbController.updateList(session.user.sub, game as Game);
      });
      const fullList = (await DbController.getGameList(session.user.sub)) || [];

      let filteredList = GameListController.filterByList(
        fullList,
        "toPlay",
        "DESC"
      );

      const { items: paginatedList, pagination } =
        GameListController.getPaginatedResults(filteredList, 1, 10);

      const payload = {
        gameList: paginatedList,
        pagination,
        counts: {
          gamesToPlay: fullList.filter((game) => game.status === "toPlay")
            .length,
          gamesPlayed: fullList.filter((game) =>
            ["beat", "dropped", "playing"].includes(game.status)
          ).length,
        },
      };

      return {
        statusCode: 200,
        statusMessage: "Ok",
        payload,
        message: "Games updated",
      };
    }
  }
});
