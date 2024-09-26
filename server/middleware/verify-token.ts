import { verifyToken } from "../services/tokenManagers/auth";

export default defineEventHandler(async (event) => {
  // if (
  //   event.path.includes("/api/game-list") ||
  //   event.path.includes("/api/user")
  // ) {
  //   try {
  //     const token = getCookie(event, "authToken");
  //     if (token) {
  //       const decodedToken = await verifyToken(token);
  //       event.context = {
  //         ...event.context,
  //         decodedToken,
  //       };
  //     } else {
  //       throw Error("No token provided");
  //     }
  //   } catch (error) {
  //     console.error("Error getting token:", error);
  //     throw createError({
  //       statusCode: 401,
  //       statusMessage: "Unauthorized",
  //       message: "No token provided",
  //     });
  //   }
  // }
});
