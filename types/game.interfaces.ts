export interface Game {
  slug: string;
  name: string;
  id: number;
  genres: string[];
  released: string;
  image: string;
  screenshots: string[];
  platforms: string[];
}

export interface UserGame extends Game {
  status: "toPlay" | "beat" | "dropped" | "playing";
  comments: string;
  monthPlayed: number;
  yearPlayed: number;
}

export type GameUserData = {
  status: "toPlay" | "beat" | "dropped" | "playing";
  comments: string;
  monthPlayed: number;
  yearPlayed: number;
};
