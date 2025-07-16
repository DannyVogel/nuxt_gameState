interface Genre {
  id: number;
  name: string;
}

interface Platform {
  id: number;
  name: string;
}

interface Screenshot {
  id: number;
  image_id: string;
}

interface Artwork {
  id: number;
  image_id: string;
}

interface Game {
  id: number;
  first_release_date: number;
  genres: Genre[];
  name: string;
  platforms: Platform[];
  screenshots: Screenshot[];
  artworks: Artwork[];
  slug: string;
}

export type SearchResponse = Game[];
