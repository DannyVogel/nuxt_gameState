import { AuthController } from "~/server/controllers/auth.controller";
import { DbController } from "~/server/controllers/db.controller";
import { serverResponse } from "~/server/utils/response";

export default defineEventHandler(async (event) => {
  console.log("/api/auth/login.post");
  const body = await readBody(event);
  const res = await AuthController.login(body.email, body.password);
  if (res.success) {
    setCookie(event, "token", await res.user!.getIdToken(), {
      httpOnly: true,
    });
    const gameList = await DbController.getGameList(res.user!.uid);
    const payload = {
      uid: res.user!.uid,
      email: res.user!.email,
      gameList,
    };
    return serverResponse(200, "OK", payload);
  } else {
    return serverResponse(401, "Unauthorized", "Invalid email or password.");
  }
});
