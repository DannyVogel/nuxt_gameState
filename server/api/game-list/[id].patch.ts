import { getToken } from "~/server/services/tokenManagers/igdb";
import { GameDTO } from "~/server/utils/gameState.class";
import { DbController } from "~/server/controllers/db.controller";
import type { Game } from "~/types/game.interfaces";

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
      return {
        statusCode: 200,
        statusMessage: "Ok",
        payload: games,
        message: "Games updated",
      };
    }
  }
});
