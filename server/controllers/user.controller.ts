import { fbAdmin } from "../services/firebase";

export class UserController {
  static async updateDisplayName(UID: string, displayName: string) {
    try {
      await fbAdmin.auth().updateUser(UID, {
        displayName: displayName,
      });
      console.log("User display name updated successfully");
    } catch (error) {
      console.error("Error updating user display name:", error);
    }
  }
}
