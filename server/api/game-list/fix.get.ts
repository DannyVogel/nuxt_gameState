import { DbController } from "../../controllers/db.controller";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event).catch((error) => {
    console.error("Error requiring user session:", error);
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "User not logged in",
    });
  });
  const fullList = (await DbController.getGameList(session.user.sub)) || [];
  const gamesWithoutStatus = fullList.filter((game) => !game.status);
  return gamesWithoutStatus;
});
