import { DbController } from "../../controllers/db.controller";

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
      return {
        statusCode: 200,
        statusMessage: "Ok",
        payload: null,
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
