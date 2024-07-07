import { DbController } from "~/server/controllers/db.controller";

export default defineEventHandler(async (event) => {
  const { decodedToken } = event.context;
  const res = await DbController.getGameList(decodedToken.uid);
  return res;
});
