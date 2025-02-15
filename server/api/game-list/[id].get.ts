import { DbController } from "~/server/controllers/db.controller";

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
    const gameId = getRouterParam(event, "id");

    if (!gameId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Game ID is required",
      });
    }

    const userGameList = await DbController.getGameList(session.user.sub);
    if (!userGameList) {
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Game list not found",
      });
    }
    const game = userGameList.find((game) => game.id === parseInt(gameId));
    if (!game) {
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Game not found in user's list",
      });
    }

    return {
      statusCode: 200,
      statusMessage: "Ok",
      payload: game,
      message: "Game retrieved successfully",
    };
  } catch (error: any) {
    console.error("Error getting game list by id:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: error.message || "An error occurred",
    });
  }
});
