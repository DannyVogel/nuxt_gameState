import { GameStats, UserGame } from "~/types/game.interfaces";

export class StatsController {
  static generateGameStats(games: UserGame[]): GameStats {
    const totalGames = games.length;

    const statusBreakdown = {
      beat: games.filter((game) => game.status === "beat").length,
      playing: games.filter((game) => game.status === "playing").length,
      toPlay: games.filter((game) => game.status === "toPlay").length,
      dropped: games.filter((game) => game.status === "dropped").length,
    };

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

    const playedGames = games.filter((game) =>
      ["beat", "playing", "dropped"].includes(game.status)
    ).length;
    const beatGames = statusBreakdown.beat;
    const completionRate =
      playedGames > 0 ? Math.round((beatGames / playedGames) * 100) : 0;

    // First collect the data in a regular object
    const yearCounts: { [year: string]: number } = {};
    games.forEach((game) => {
      if (game.yearPlayed) {
        const yearKey = String(game.yearPlayed);
        yearCounts[yearKey] = (yearCounts[yearKey] || 0) + 1;
      }
    });

    // Create an array of year/count pairs sorted by year (descending)
    const yearlyBreakdown = Object.entries(yearCounts)
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => parseInt(b.year, 10) - parseInt(a.year, 10));

    console.log("yearlyBreakdown array:", yearlyBreakdown);

    const mostPlayedGenres = Object.entries(genreBreakdown)
      .map(([genre, count]) => ({ genre, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const mostPlayedPlatforms = Object.entries(platformBreakdown)
      .map(([platform, count]) => ({ platform, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const recentActivity: { monthYear: string; count: number }[] = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    for (let i = 0; i < 4; i++) {
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

      const gamesThisMonth = games.filter((game) => {
        const gameMonth = String(game.monthPlayed);
        const gameYear = String(game.yearPlayed);
        const filterMonth = String(month);
        const filterYear = String(year);

        return gameMonth === filterMonth && gameYear === filterYear;
      });

      recentActivity.unshift({
        monthYear: monthYearString,
        count: gamesThisMonth.length,
      });
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
