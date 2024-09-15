import { AuthController } from "~/server/controllers/auth.controller";
import { DbController } from "~/server/controllers/db.controller";
import { serverResponse } from "~/server/utils/response";
import { NitroResponse, LoginPayload } from "~/types/auth.interfaces";

export default defineEventHandler(
  async (event): Promise<NitroResponse<LoginPayload>> => {
    const body = await readBody(event);
    const res = await AuthController.loginAndGetGameList(
      body.email,
      body.password
    );
    if (res.success) {
      setCookie(event, "token", await res.user!.getIdToken(), {
        httpOnly: true,
      });
      const payload = {
        uid: res.user!.uid,
        email: res.user!.email,
        username: res.user?.displayName,
        gameList: res.gameList,
      };
      return serverResponse(200, "OK", payload);
    } else {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: "Invalid email or password.",
      });
    }
  }
);
