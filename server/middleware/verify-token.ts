import { verifyToken } from "../services/tokenManagers/auth";
import { auth } from "../services/firebase";

export default defineEventHandler(async (event) => {
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
      const newToken = await auth.currentUser?.getIdToken(true);
      if (newToken) {
        setCookie(event, "token", newToken, { httpOnly: true });
        const decodedToken = await verifyToken(newToken);
        event.context = {
          ...event.context,
          decodedToken,
        };
      } else
        throw createError({
          statusCode: 401,
          statusMessage: "Unauthorized",
          message: "No token provided",
        });
    }
  }
});
