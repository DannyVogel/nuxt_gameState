import { UserGameDTO } from "~/server/utils/gameState.class";
import { DbController } from "~/server/controllers/db.controller";
import { getToken } from "~/server/services/tokenManagers/igdb";

export default eventHandler(async (event) => {
  console.log("search game");
  const config = useRuntimeConfig();
  const IGDBClientId = config.IGDBClientId;
  const query = decodeURIComponent(getRouterParam(event, "query") as string);
  const token = await getToken();
  console.log("query", query, "token", token);
  await DbController.addLog({
    type: "search",
    query,
    token: token?.substring(0, 10),
  });

  const response = await $fetch<Promise<SearchResponse>>(
    "https://api.igdb.com/v4/games",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": IGDBClientId,
        Authorization: `Bearer ${token}`,
      },
      body: `fields slug, name, id, genres.name, first_release_date, screenshots.image_id, artworks.image_id, platforms.name; search "${query}";limit 50;where keywords != (2004, 1617, 24124) & category != (5,12);`,
    }
  ).catch((error) => {
    console.error("error", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: error.message,
    });
  });
  if (!response) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "No response from IGDB API",
    });
  }

  if (Array.isArray(response)) {
    if (response.length === 0) {
      throw createError({ statusCode: 404, message: "No game found" });
    } else if (response.length > 0) {
      const games = response.map((result) => new UserGameDTO(result));
      return {
        statusCode: 200,
        statusMessage: "Ok",
        payload: games,
        message: "Games retrieved",
      };
    }
  }
});
