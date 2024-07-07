import { AuthController } from "~/server/controllers/auth.controller";

export default defineEventHandler(async (event) => {
  await AuthController.logout();
  deleteCookie(event, "token");
  return serverResponse(200, "OK", null);
});
