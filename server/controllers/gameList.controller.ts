import { UserGame } from "~/types/game.interfaces";

export class GameListController {
  static filterByList(
    games: UserGame[],
    list: "toPlay" | "played",
    sort: "ASC" | "DESC" = "DESC"
  ): UserGame[] {
    if (list === "toPlay") {
      return this.filterAndSortToPlay(games, sort);
    } else if (list === "played") {
      return this.filterAndSortPlayed(games);
    }
    return games;
  }

  private static filterAndSortToPlay(
    games: UserGame[],
    sort: "ASC" | "DESC" = "DESC"
  ): UserGame[] {
    const filtered = games.filter((game) => game.status === "toPlay");
    return filtered.sort((a, b) => {
      if (a.released === "TBA" && b.released === "TBA") return 0;
      if (a.released === "TBA") return sort === "DESC" ? -1 : 1;
      if (b.released === "TBA") return sort === "DESC" ? 1 : -1;
      const dateA = new Date(a.released || 0);
      const dateB = new Date(b.released || 0);
      return sort === "DESC"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });
  }

  private static filterAndSortPlayed(games: UserGame[]): UserGame[] {
    const filtered = games.filter((game) =>
      ["beat", "dropped", "playing"].includes(game.status)
    );
    return filtered.sort((a, b) => {
      const currentYear = new Date().getFullYear();
      const yearA = Number(a.yearPlayed) || currentYear;
      const yearB = Number(b.yearPlayed) || currentYear;
      const dateA = yearA * 100 + (Number(a.monthPlayed) || 0);
      const dateB = yearB * 100 + (Number(b.monthPlayed) || 0);
      return dateB - dateA;
    });
  }

  static applyFilters(
    games: UserGame[],
    status?: string,
    search?: string,
    year?: number,
    hasComments?: boolean
  ): UserGame[] {
    let filtered = [...games];

    if (status) {
      filtered = filtered.filter((game) => game.status === status);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((game) =>
        game.name.toLowerCase().includes(searchLower)
      );
    }

    if (year) {
      filtered = filtered.filter((game) => Number(game.yearPlayed) === year);
    }

    if (hasComments !== undefined) {
      filtered = filtered.filter((game) => {
        const hasGameComments = Boolean(game.comments && game.comments.trim());
        return hasComments ? hasGameComments : !hasGameComments;
      });
    }

    return filtered;
  }

  static getPaginatedResults(
    games: UserGame[],
    page: number,
    limit: number
  ): {
    items: UserGame[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  } {
    const offset = (page - 1) * limit;
    return {
      items: games.slice(offset, offset + limit),
      pagination: {
        total: games.length,
        page,
        limit,
        totalPages: Math.ceil(games.length / limit),
      },
    };
  }
}
