import { DbController } from "~/server/controllers/db.controller";
import { GameListPayload, NitroResponse } from "~/types/auth.interfaces";
import { UserGame } from "~/types/game.interfaces";

export default defineEventHandler(
  async (event): Promise<NitroResponse<GameListPayload>> => {
    const game = await readBody(event);
    const { decodedToken } = event.context;

    try {
      await DbController.removeFromList(decodedToken.uid, game.id);
      const updatedList = (await DbController.getGameList(
        decodedToken.uid
      )) as UserGame[];
      return serverResponse(200, "Ok", updatedList);
    } catch (error: any) {
      console.error("Error removing game from list:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: error.message,
      });
    }
  }
);
