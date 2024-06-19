export default class ClientGameResponse {
  slug: string;
  name: string;
  id: number;
  genres: string[];
  released: string;
  image: string;
  screenshots: string[];
  platforms: string[];

  constructor(result: Game) {
    this.slug = result.slug ? result.slug : "";
    this.name = result.name ? result.name : "";
    this.id = result.id;
    this.genres = result.genres ? result.genres.map((genre) => genre.name) : [];
    this.released = result.first_release_date
      ? new Date(result.first_release_date * 1000).toISOString().split("T")[0]
      : "TBA";
    this.image =
      result.screenshots && result.screenshots.length > 0
        ? `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${result.screenshots[0].image_id}.jpg`
        : "";
    this.screenshots = result.screenshots
      ? result.screenshots.map(
          (screenshot) =>
            `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${screenshot.image_id}.jpg`
        )
      : [];
    this.platforms = result.platforms
      ? result.platforms.map((platform) => platform.name)
      : [];
  }
}
