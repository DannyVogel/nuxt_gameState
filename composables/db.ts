import type { Game, UserGame } from "~/types/game.interfaces";

const dbState = reactive({
  gameList: [] as UserGame[],
});

export const useDb = () => {
  const { gameList } = toRefs(dbState);
  const gamesToPlayCount = computed(() => {
    return gameList.value.filter((game) => game.status === "toPlay").length;
  });
  const gamesPlayedCount = computed(() => {
    return gameList.value.filter((game) => game.status !== "toPlay").length;
  });

  const getGamesToPlay = computed(() => {
    return gameList.value
      .filter((game) => game.status === "toPlay")
      .sort((a, b) => {
        return a.released.localeCompare(b.released);
      });
  });

  const getGamesPlayed = computed(() => {
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

  const getYearsPlayed = computed(() => {
    return Array.from(
      new Set(getGamesPlayed.value.map((game) => game.yearPlayed))
    );
  });

  const getGameList = async () => {
    try {
      const res = await $fetch("/api/game-list");
      if (res.payload) gameList.value = res.payload;
    } catch (error) {
      console.error("get game list error", error);
    }
  };

  const addToList = async (game: Game) => {
    try {
      const res = await $fetch("/api/game-list/add", {
        method: "POST",
        body: game,
      });
      if (res.payload) gameList.value = res.payload;
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
      if (res.payload) gameList.value = res.payload;
    } catch (error) {
      console.error("remove from list error", error);
    }
  };

  return {
    gameList,
    gamesToPlayCount,
    gamesPlayedCount,
    getGamesToPlay,
    getGamesPlayed,
    getYearsPlayed,
    getGameList,
    addToList,
    removeFromList,
  };
};
