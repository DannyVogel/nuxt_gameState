import type { Game, UserGame } from "~/types/game.interfaces";

export const useDb = () => {
  const userStore = useUserStore();

  const addToList = async (game: Game) => {
    try {
      const res = await $fetch("/api/game-list/add", {
        method: "POST",
        body: game,
      });
      if (res.payload) userStore.gameList = res.payload;
    } catch (error) {
      console.error("add to list error", error);
    }
  };

  const removeFromList = async (gameID: Game["id"]) => {
    try {
      const res = await $fetch("/api/game-list/remove", {
        method: "DELETE",
        body: { id: gameID },
      });
      if (res.payload) userStore.gameList = res.payload;
    } catch (error) {
      console.error("remove from list error", error);
    }
  };

  return {
    addToList,
    removeFromList,
  };
};
