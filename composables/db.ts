import { ref as fbRef, get, update, remove } from "firebase/database";
import type { Game } from "~/types/game.interfaces";

export const useDb = () => {
  const { $db, $gameStateDB } = useNuxtApp();
  const userStore = useUserStore();

  const addToList = async (game: Game) => {
    console.log("add to list game", game);
    try {
      const res = await $fetch("/api/game-list/add", {
        method: "POST",
        body: game,
      });
      console.log("add to list res", res);
    } catch (error) {
      console.error("add to list error", error);
    }
  };

  const removeFromList = async (gameID: Game["id"]) => {
    console.log("remove from list gameID", gameID);
    try {
      const res = await $fetch("/api/game-list/remove", {
        method: "DELETE",
        body: { id: gameID },
      });
      console.log("remove from list res", res);
    } catch (error) {
      console.error("remove from list error", error);
    }
  };

  return {
    addToList,
    removeFromList,
  };
};
