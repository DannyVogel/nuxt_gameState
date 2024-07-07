import { DbController } from "~/server/controllers/db.controller";

export default defineEventHandler(async (event) => {
  const game = await readBody(event);
  const { decodedToken } = event.context;
  const res = await DbController.addToList(decodedToken.uid, game);
});
