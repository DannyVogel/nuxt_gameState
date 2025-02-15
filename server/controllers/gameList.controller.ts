import { UserGame } from "~/types/game.interfaces";

export class GameListController {
  static filterByList(
    games: UserGame[],
    list: "toPlay" | "played"
  ): UserGame[] {
    if (list === "toPlay") {
      return this.filterAndSortToPlay(games);
    } else if (list === "played") {
      return this.filterAndSortPlayed(games);
    }
    return games;
  }

  private static filterAndSortToPlay(games: UserGame[]): UserGame[] {
    const filtered = games.filter((game) => game.status === "toPlay");
    return filtered.sort((a, b) => {
      if (a.released === "TBA") return 1;
      if (b.released === "TBA") return -1;
      return new Date(a.released).getTime() - new Date(b.released).getTime();
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
    search?: string
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
