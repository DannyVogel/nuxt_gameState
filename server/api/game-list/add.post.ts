import { DbController } from "~/server/controllers/db.controller";
import { GameListPayload, NitroResponse } from "~/types/auth.interfaces";
import { UserGame } from "~/types/game.interfaces";

export default defineEventHandler(
  async (event): Promise<NitroResponse<UserGame[]>> => {
    const game = await readBody(event);
    const { decodedToken } = event.context;
    try {
      await DbController.addToList(decodedToken.uid, game);
      const updatedList = await DbController.getGameList(decodedToken.uid);
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
