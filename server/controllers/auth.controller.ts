import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { DbController } from "./db.controller";

export class AuthController {
  static async loginAndGetGameList(email: string, password: string) {
    try {
      const userCredential = await AuthController.login(email, password);
      const user = userCredential.user;
      const gameList = await DbController.getGameList(user.uid);
      return {
        success: true,
        user: user,
        gameList: gameList,
      };
    } catch (error: any) {
      return {
        success: false,
        errorMessage: error.message,
      };
    }
  }

  static async login(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  static async register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return {
        success: true,
        user: userCredential.user,
      };
    } catch (error: any) {
      const errorMessage = error.message;
      console.log(errorMessage);
      return {
        success: false,
        errorMessage: errorMessage,
      };
    }
  }

  static async logout() {
    try {
      await signOut(auth);
    } catch (error: any) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  }
}
