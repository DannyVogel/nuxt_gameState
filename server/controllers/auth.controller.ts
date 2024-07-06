import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebase";

export class AuthController {
  static async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return {
        success: true,
        user: userCredential.user,
      };
    } catch (error: any) {
      console.log(error.message);
      return {
        success: false,
        errorMessage: error.message,
      };
    }
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
