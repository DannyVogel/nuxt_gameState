import type { UserGame, Game } from "~/types/game.interfaces";
import type { User } from "#auth-utils";

export const useListStore = defineStore("List", () => {
  const gameList = ref([] as UserGame[]);

  const gamesToPlay = computed(() => {
    return gameList.value
      .filter((game) => game.status === "toPlay")
      .sort((a, b) => {
        return a.released.localeCompare(b.released);
      });
  });

  const gamesToPlayCount = computed(() => {
    return gamesToPlay.value.length;
  });

  const gamesPlayed = computed(() => {
    return gameList.value
      .filter((game) => game.status !== "toPlay")
      .sort((a, b) => {
        if (b.yearPlayed === a.yearPlayed) {
          return b.monthPlayed - a.monthPlayed;
        } else {
          return b.yearPlayed - a.yearPlayed;
        }
      });
  });

  const gamesPlayedCount = computed(() => {
    return gamesPlayed.value.length;
  });

  const yearsPlayed = computed(() => {
    return Array.from(
      new Set(gamesPlayed.value.map((game) => game.yearPlayed))
    );
  });

  const getGameList = async (userID: User["sub"]) => {
    const res = await $fetch("/api/game-list");
    gameList.value = res.payload.gameList;
    return res;
  };

  const addToList = async (game: Game) => {
    const res = await $fetch("/api/game-list/add", {
      method: "POST",
      body: game,
    });
    if (res.payload) gameList.value = res.payload;
    return res;
  };

  const removeFromList = async (gameID: Game["id"]) => {
    const res = await $fetch("/api/game-list/remove", {
      method: "DELETE",
      body: { id: gameID },
    });
    if (res.payload) gameList.value = res.payload;
    return res;
  };

  const clearList = () => {
    gameList.value = [];
  };

  return {
    gameList,
    gamesToPlay,
    gamesPlayed,
    gamesToPlayCount,
    gamesPlayedCount,
    yearsPlayed,
    getGameList,
    addToList,
    removeFromList,
    clearList,
  };
});
