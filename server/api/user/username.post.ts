import { UserController } from "~/server/controllers/user.controller";

export default defineEventHandler(async (event) => {
  const username = await readBody(event);
  const { decodedToken } = event.context;
  try {
    await UserController.updateDisplayName(decodedToken.uid, username);
  } catch (error: any) {
    console.error("error updating display name:", error.message);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
