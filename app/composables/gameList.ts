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
    return res;
  };

  const removeFromList = async (gameID: Game["id"]) => {
    const res = await fetch("/api/game-list/remove", {
      method: "DELETE",
      body: { id: gameID },
    });
    return res;
  };

  const getGameById = async (gameId: string) => {
    const res = await fetch<NitroResponse<UserGame>>(
      `/api/game-list/${gameId}`
    );
    return res.payload;
  };

  const updateGameById = async (gameId: string) => {
    const res = await fetch<NitroResponse<GameListPayload>>(
      `/api/game-list/${gameId}`,
      {
        method: "PATCH",
      }
    );
    return res.payload?.gameList.find((game) => game.id.toString() === gameId);
  };

  const updateGames = async (gameIds: number[]) => {
    const res = await fetch<NitroResponse<GameListPayload>>(
      `/api/game-list/${gameIds.join(",")}`,
      {
        method: "PATCH",
      }
    );
    if (!res.payload) {
      return {
        games: [],
        total: 0,
      };
    }
    return {
      games: res.payload.gameList,
      total: res.payload.counts.gamesToPlay,
    };
  };

  const restoreData = async () => {
    const res = await fetch("/api/game-list/fix", {
      method: "POST",
      body: [], // Import and place backup JSON data here when available
    });
    return res.payload;
  };

  const getGameStats = async () => {
    const response = await fetch<NitroResponse<GameStats>>(
      "/api/game-list/stats"
    );
    if (response && response.payload) {
      return response.payload;
    }
    throw new Error("Failed to retrieve game stats");
  };

  return {
    getGamesCount,
    getGamesToPlay,
    getGamesPlayed,
    getGameById,
    updateGameById,
    addToList,
    removeFromList,
    updateGames,
    restoreData,
    getGameStats,
  };
};
