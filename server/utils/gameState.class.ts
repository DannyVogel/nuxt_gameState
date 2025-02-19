export class GameDTO {
  slug: string | null;
  name: string | null;
  id: number;
  genres: string[];
  released: string;
  imageId: string | null;
  screenshotIds: string[];
  platforms: string[];

  constructor(result: Game) {
    this.slug = result.slug ? result.slug : null;
    this.name = result.name ? result.name : null;
    this.id = result.id;
    this.genres = result.genres ? result.genres.map((genre) => genre.name) : [];
    this.released = result.first_release_date
      ? new Date(result.first_release_date * 1000).toISOString().split("T")[0]
      : "TBA";
    this.imageId =
      result.screenshots && result.screenshots.length > 0
        ? result.screenshots[0].image_id
        : null;
    this.screenshotIds = [
      ...getImageIds(result.screenshots),
      ...getImageIds(result.artworks),
    ];
    this.platforms = result.platforms
      ? result.platforms.map((platform) => platform.name)
      : [];
  }
}
export class UserGameDTO extends GameDTO {
  monthPlayed: string | null;
  yearPlayed: string | null;
  status: string | null;
  comments: string | null;

  constructor(result: Game) {
    super(result);
    this.monthPlayed = null;
    this.yearPlayed = null;
    this.status = null;
    this.comments = null;
  }
}

const getImageUrls = (images: any[], type: string) =>
  images
    ? images.map(
        (img) =>
          `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${img.image_id}.jpg`
      )
    : [];

const getImageIds = (images: any[]) =>
  images ? images.map((img) => img.image_id) : [];
