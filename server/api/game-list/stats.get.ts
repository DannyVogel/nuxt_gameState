import { DbController } from "~/server/controllers/db.controller";
import { StatsController } from "~/server/controllers/stats.controller";

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
    // Get the user's full game list
    const fullGameList =
      (await DbController.getGameList(session.user.sub)) || [];

    // Generate stats from the game list
    const gameStats = StatsController.generateGameStats(fullGameList);

    return {
      statusCode: 200,
      statusMessage: "Ok",
      payload: gameStats,
      message: "Game stats retrieved successfully",
    };
  } catch (error: any) {
    console.error("Error generating game stats:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: error.message,
    });
  }
});
