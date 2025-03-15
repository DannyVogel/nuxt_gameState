import { DbController } from "~/server/controllers/db.controller";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);
  await DbController.addLog({
    type: "save-test",
    query: body.text,
  });
  return {
    message: "Text added to db",
  };
});
