import { UserController } from "~/server/controllers/user.controller";
import { DisplayNamePayload, NitroResponse } from "~/types/auth.interfaces";

export default defineEventHandler(
  async (event): Promise<NitroResponse<DisplayNamePayload>> => {
    const { displayName } = await readBody(event);
    const { decodedToken } = event.context;
    try {
      await UserController.updateDisplayName(decodedToken.uid, displayName);
      console.log("display name updated");
      return serverResponse(
        200,
        "OK",
        { displayName },
        "Display name updated successfully"
      );
    } catch (error: any) {
      console.error("error updating display name:", error.message);
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
      });
    }
  }
);
