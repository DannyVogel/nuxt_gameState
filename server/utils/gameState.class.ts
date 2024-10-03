export default class ClientGameResponse {
  slug: string;
  name: string;
  id: number;
  genres: string[];
  released: string;
  image: string;
  screenshots: string[];
  platforms: string[];
  monthPlayed: string;
  yearPlayed: string;
  status: string;
  comments: string;

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

    const artworkUrls = getImageUrls(result.artworks, "artwork");
    const screenshotUrls = getImageUrls(result.screenshots, "screenshot");
    this.image =
      result.screenshots && result.screenshots.length > 0
        ? `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${result.screenshots[0].image_id}.jpg`
        : "";
    this.screenshots = [...artworkUrls, ...screenshotUrls];
    this.platforms = result.platforms
      ? result.platforms.map((platform) => platform.name)
      : [];
    this.monthPlayed = "";
    this.yearPlayed = "";
    this.status = "";
    this.comments = "";
  }
}

const getImageUrls = (images: any[], type: string) =>
  images
    ? images.map(
        (img) =>
          `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${img.image_id}.jpg`
      )
    : [];
