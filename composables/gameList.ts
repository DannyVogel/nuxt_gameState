import type { NitroResponse } from "~/types/auth.interfaces";
import type { Game, UserGame } from "~/types/game.interfaces";

export const useGameList = () => {
  const fetch = useRequestFetch();

  const getGamesCount = async () => {
    const res = await fetch("/api/game-list?page=1&limit=1");
    return res.payload.counts;
  };

  const getGamesToPlay = async (
    page: number = 1,
    limit: number = 10,
    sort: "ASC" | "DESC" = "DESC"
  ) => {
    const res = await fetch(
      `/api/game-list?list=toPlay&page=${page}&limit=${limit}&sort=${sort}`
    );
    return {
      games: res.payload.gameList,
      total: res.payload.counts.gamesToPlay,
    };
  };

  const getGamesPlayed = async (
    page: number = 1,
    limit: number = 10,
    status?: string | null,
    year?: number | null,
    hasComments?: boolean | null
  ) => {
    const queryParams = new URLSearchParams({
      list: "played",
      page: page.toString(),
      limit: limit.toString(),
    });

    if (status) {
      queryParams.append("status", status);
    }
    if (year) {
      queryParams.append("year", year.toString());
    }
    if (hasComments) {
      queryParams.append("hasComments", "true");
    }

    const res = await fetch(`/api/game-list?${queryParams.toString()}`);
    return {
      games: res.payload.gameList,
      total: res.payload.pagination.total,
    };
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

  const getGameById = async (gameId: string) => {
    const res = await fetch<NitroResponse<UserGame>>(
      `/api/game-list/${gameId}`
    );
    return res.payload;
  };

  return {
    getGamesCount,
    getGamesToPlay,
    getGamesPlayed,
    getGameById,
    addToList,
    removeFromList,
  };
};
