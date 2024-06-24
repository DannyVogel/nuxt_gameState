import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const useAuth = () => {
  const { $auth } = useNuxtApp();
  const userStore = useUserStore();

  const logIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        $auth,
        email,
        password
      );
      if (userCredential) {
        return {
          success: true,
          user: userCredential.user,
        };
      }
    } catch (error: any) {
      console.log(error.message);
      return {
        success: false,
        errorMessage: error.message,
      };
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        $auth,
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
  };

  const logOut = async () => {
    try {
      await signOut($auth);
      userStore.logOut();
    } catch (error: any) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  const guestLogIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        $auth,
        "guest@guest.com",
        "123456"
      );
      if (userCredential) {
        return {
          success: true,
          user: userCredential.user,
        };
      }
    } catch (error: any) {
      console.log(error.message);
      return {
        success: false,
        errorMessage: error.message,
      };
    }
  };

  return {
    logIn,
    register,
    logOut,
    guestLogIn,
  };
};
