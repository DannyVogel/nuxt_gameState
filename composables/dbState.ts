import { ref as fbRef, onValue } from "firebase/database";

export const useDbState = () => {
  const userStore = useUserStore();
  const { $db } = useNuxtApp();

  onMounted(() => {
    const listRef = fbRef($db, `gameState/users/${userStore.UID}/gameList`);
    onValue(listRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        userStore.gameList = Object.values(data);
      }
    });
  });
};
