import type { Game } from "~/types/game.interfaces";

export const useGameList = () => {
  const fetch = useRequestFetch();

  const getGamesCount = async () => {
    const res = await fetch("/api/game-list?page=1&limit=1");
    return res.payload.counts;
  };

  const getGamesToPlay = async (page: number = 1, limit: number = 10) => {
    const res = await fetch(
      `/api/game-list?list=toPlay&page=${page}&limit=${limit}`
    );
    // Return both the list and counts for better pagination control
    return {
      games: res.payload.gameList,
      total: res.payload.counts.gamesToPlay,
    };
  };

  const getGamesToPlayCount = async () => {
    const res = await fetch("/api/game-list");
    return res.payload.counts.gamesToPlay;
  };

  const getGamesPlayed = async (page: number = 1, limit: number = 10) => {
    const res = await fetch(
      `/api/game-list?list=played&page=${page}&limit=${limit}`
    );
    return {
      games: res.payload.gameList,
      total: res.payload.counts.gamesPlayed,
    };
  };

  const getGamesPlayedCount = async () => {
    const res = await fetch("/api/game-list");
    return res.payload.counts.gamesPlayed;
  };

  const yearsPlayed = async () => {
    const gameList = await getGamesPlayed();
    if (!gameList) return [];
    return Array.from(new Set(gameList.games.map((game) => game.yearPlayed)));
  };

  const addToList = async (game: Game) => {
    const res = await fetch("/api/game-list/add", {
      method: "POST",
      body: game,
    });
    return res.payload;
  };

  const removeFromList = async (gameID: Game["id"]) => {
    const res = await fetch("/api/game-list/remove", {
      method: "DELETE",
      body: { id: gameID },
    });
    return res.payload;
  };

  return {
    yearsPlayed,
    getGamesCount,
    getGamesToPlay,
    getGamesToPlayCount,
    getGamesPlayed,
    getGamesPlayedCount,
    addToList,
    removeFromList,
  };
};
