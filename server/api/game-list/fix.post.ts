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

  try {
    const missingDataGames = await readBody(event);

    const updatePromises = Object.values(missingDataGames).map((game: Game) =>
      DbController.updateList(session.user.sub, game)
    );

    await Promise.all(updatePromises);

    return {
      statusCode: 200,
      statusMessage: "Ok",
      payload: null,
      message: `Successfully restored data for ${
        Object.keys(missingDataGames).length
      } games`,
    };
  } catch (error: any) {
    console.error("Error fixing game data:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: error.message,
    });
  }
});
