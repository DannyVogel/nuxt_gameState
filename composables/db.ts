import { ref as fbRef, get, update, remove } from "firebase/database";
import type { Game } from "~/types/game.interfaces";

export const useDb = () => {
  const { $db, $gameStateDB } = useNuxtApp();

  const getGameList = async (UID: string) => {
    const listRef = fbRef($db, `gameState/users/${UID}/gameList`);
    const snapshot = await get(listRef);
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      return [];
    }
  };

  const addToList = async (UID: string, game: Game) => {
    const updates: { [key: string]: Game } = {};
    updates[`/users/${UID}/gameList/${game.id}`] = game;
    update($gameStateDB, updates);
  };

  const removeFromList = async (UID: string, gameID: Game["id"]) => {
    const gameRef = fbRef($db, `gameState/users/${UID}/gameList/${gameID}`);
    remove(gameRef);
  };

  // const updateList = async (UID: string, gameID: Game["id"], data) => {
  //   const gameRef = fbRef($db, `gameState/users/${UID}/gameList/${gameID}`);
  //   update(gameRef, data);
  // };

  return {
    getGameList,
    addToList,
    removeFromList,
    // updateList,
  };
};
