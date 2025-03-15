import { DbController } from "~/server/controllers/db.controller";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);
  try {
    await DbController.addLog({
      type: "save-test",
      query: body ? body.text : "yeah it works",
    });
    return {
      statusCode: 200,
      message: "Text added to db",
    };
  } catch (error) {
    console.error("Failed to add text to db", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: error.message,
    });
  }
});
