import { GameStats, UserGame } from "~/types/game.interfaces";

export class StatsController {
  static generateGameStats(games: UserGame[]): GameStats {
    const totalGames = games.length;

    // Status breakdown
    const statusBreakdown = {
      beat: games.filter((game) => game.status === "beat").length,
      playing: games.filter((game) => game.status === "playing").length,
      toPlay: games.filter((game) => game.status === "toPlay").length,
      dropped: games.filter((game) => game.status === "dropped").length,
    };

    // Genre breakdown
    const genreBreakdown: { [genre: string]: number } = {};
    games.forEach((game) => {
      if (game.genres && Array.isArray(game.genres)) {
        game.genres.forEach((genre) => {
          if (genre) {
            genreBreakdown[genre] = (genreBreakdown[genre] || 0) + 1;
          }
        });
      }
    });

    // Platform breakdown
    const platformBreakdown: { [platform: string]: number } = {};
    games.forEach((game) => {
      if (game.platforms && Array.isArray(game.platforms)) {
        game.platforms.forEach((platform) => {
          if (platform) {
            platformBreakdown[platform] =
              (platformBreakdown[platform] || 0) + 1;
          }
        });
      }
    });

    // Completion rate
    const playedGames = games.filter((game) =>
      ["beat", "playing", "dropped"].includes(game.status)
    ).length;
    const beatGames = statusBreakdown.beat;
    const completionRate =
      playedGames > 0 ? Math.round((beatGames / playedGames) * 100) : 0;

    // Yearly breakdown
    const yearlyBreakdown: { [year: number]: number } = {};
    games.forEach((game) => {
      if (game.yearPlayed) {
        yearlyBreakdown[game.yearPlayed] =
          (yearlyBreakdown[game.yearPlayed] || 0) + 1;
      }
    });

    // Most played genres
    const mostPlayedGenres = Object.entries(genreBreakdown)
      .map(([genre, count]) => ({ genre, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Most played platforms
    const mostPlayedPlatforms = Object.entries(platformBreakdown)
      .map(([platform, count]) => ({ platform, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Recent activity - last 6 months
    const recentActivity: { monthYear: string; count: number }[] = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    // Generate the last 6 months
    for (let i = 0; i < 6; i++) {
      let month = currentMonth - i;
      let year = currentYear;

      if (month <= 0) {
        month += 12;
        year -= 1;
      }

      const monthName = new Date(year, month - 1, 1).toLocaleString("default", {
        month: "short",
      });
      const monthYearString = `${monthName} ${year}`;

      const count = games.filter(
        (game) => game.monthPlayed === month && game.yearPlayed === year
      ).length;

      recentActivity.unshift({ monthYear: monthYearString, count });
    }

    return {
      totalGames,
      statusBreakdown,
      genreBreakdown,
      platformBreakdown,
      completionRate,
      yearlyBreakdown,
      mostPlayedGenres,
      mostPlayedPlatforms,
      recentActivity,
    };
  }
}
