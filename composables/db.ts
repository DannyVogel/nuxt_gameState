import { ref as fbRef, get, update, remove } from "firebase/database";
import type { Game } from "~/types/game.interfaces";

export const useDb = () => {
  const { $db, $gameStateDB } = useNuxtApp();
  const userStore = useUserStore();

  const getGameList = async (UID: string) => {
    const listRef = fbRef($db, `gameState/users/${UID}/gameList`);
    const snapshot = await get(listRef);
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      return [];
    }
  };

  const addToList = async (game: Game) => {
    const updates: { [key: string]: Game } = {};
    updates[`/users/${userStore.UID}/gameList/${game.id}`] = game;
    update($gameStateDB, updates);
  };

  const removeFromList = async (gameID: Game["id"]) => {
    const gameRef = fbRef(
      $db,
      `gameState/users/${userStore.UID}/gameList/${gameID}`
    );
    remove(gameRef);
  };

  return {
    getGameList,
    addToList,
    removeFromList,
  };
};
