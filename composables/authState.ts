import { onAuthStateChanged } from "firebase/auth";
import type { UserGame } from "~/types/game.interfaces";

export const useAuthState = () => {
  const { $auth } = useNuxtApp();
  const userStore = useUserStore();

  onMounted(() => {
    // onAuthStateChanged($auth, (user) => {
    //   if (user) {
    //     const db = useDb();
    //     userStore.isLogged = true;
    //     userStore.UID = user.uid;
    //     db.getGameList(user.uid).then((list) => {
    //       userStore.gameList = list as UserGame[];
    //     });
    //   } else {
    //     userStore.logOut();
    //   }
    // });
  });
};
