export interface Game {
  slug: string;
  name: string;
  id: number;
  genres: string[];
  released: string;
  image: string;
  screenshots: string[];
  stores: any[];
  platforms: string[];
}
