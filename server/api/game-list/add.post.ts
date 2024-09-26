import { DbController } from "~/server/controllers/db.controller";
import { NitroResponse } from "~/types/auth.interfaces";
import { UserGame } from "~/types/game.interfaces";

export default defineEventHandler(
  async (event): Promise<NitroResponse<UserGame[]>> => {
    try {
      const game = await readBody(event);
      const session = await requireUserSession(event).catch((error) => {
        console.error("Error requiring user session:", error);
        throw createError({
          statusCode: 401,
          statusMessage: "Unauthorized",
          message: "User not logged in",
        });
      });
      await DbController.addToList(session.user.sub, game);
      const updatedList = await DbController.getGameList(session.user.sub);
      return {
        statusCode: 200,
        statusMessage: "Ok",
        payload: updatedList || [],
        message: "Game added to list",
      };
    } catch (error: any) {
      console.error("Error adding game to list:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: error.message,
      });
    }
  }
);
