// ~/composables/useFirebase.ts
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export const useFBAuth = () => {
  const auth = useFirebaseAuth()!;
  const user = useCurrentUser();
  const authToken = useCookie("authToken");
  const userStore = useUserStore();
  const db = useDb();

  watch(user, async (newUser) => {
    if (newUser) {
      db.getGameList();
      const token = await newUser.getIdToken();
      authToken.value = token;
      console.log("User is logged in");
    } else {
      authToken.value = null;
      console.log("User is logged out");
    }
  });

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      user.value = userCredential.user;
      const token = await userCredential.user.getIdToken();
      authToken.value = token; // Set the cookie with the token
      db.getGameList();

      userStore.setUser({
        uid: user.value.uid,
        email: user.value.email || "",
        username: user.value.displayName || "",
      });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    user.value = null;
    authToken.value = null; // Clear the cookie
  };

  return {
    user,
    login,
    logout,
  };
};
