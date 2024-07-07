import { verifyToken } from "../services/tokenManagers/auth";

export default defineEventHandler(async (event) => {
  console.log("request path", event.path);
  if (
    event.path.includes("/api/game-list") ||
    event.path.includes("/api/user")
  ) {
    const token = getCookie(event, "token");
    if (token) {
      const decodedToken = await verifyToken(token);
      event.context = {
        ...event.context,
        decodedToken,
      };
    } else {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: "No token provided",
      });
    }
  }
});
