import { AuthController } from "~/server/controllers/auth.controller";
import { AuthResponse, LoginPayload } from "~/types/auth.interfaces";

export default defineEventHandler(
  async (event): Promise<AuthResponse<LoginPayload>> => {
    const body = await readBody(event);
    const res = await AuthController.register(body.email, body.password);
    if (res.success) {
      const payload = {
        uid: res.user!.uid,
        email: res.user!.email,
        gameList: [],
      };
      return serverResponse(200, "OK", payload);
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: res.errorMessage,
      });
    }
  }
);
