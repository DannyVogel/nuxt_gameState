import { fbAdmin } from "../firebase";

export const verifyToken = async (token: string) => {
  try {
    const decodedToken = await fbAdmin.auth().verifyIdToken(token);
    console.log("decodedToken", decodedToken);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "Invalid token",
    });
  }
};
