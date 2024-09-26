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
    const res = await DbController.getGameList(session.user.sub);
    const payload = {
      gameList: res || [],
      gamesToPlay: res?.filter((game) => game.status === "toPlay").length || 0,
      gamesPlayed: res?.filter((game) => game.status !== "toPlay").length || 0,
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
