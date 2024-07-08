import { verifyToken } from "../services/tokenManagers/auth";
import { auth } from "../services/firebase";

export default defineEventHandler(async (event) => {
  if (
    event.path.includes("/api/game-list") ||
    event.path.includes("/api/user")
  ) {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (token) {
        setCookie(event, "token", token, { httpOnly: true });
        const decodedToken = await verifyToken(token);
        event.context = {
          ...event.context,
          decodedToken,
        };
      } else {
        throw Error("No token provided");
      }
    } catch (error) {
      console.error("Error getting token:", error);
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: "No token provided",
      });
    }
  }
});
