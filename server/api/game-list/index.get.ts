import { DbController } from "~/server/controllers/db.controller";

export default defineEventHandler(async (event) => {
  const { decodedToken } = event.context;
  try {
    const res = await DbController.getGameList(decodedToken.uid);
    return res;
  } catch (error: any) {
    console.error("Error getting game list:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: error.message,
    });
  }
});
