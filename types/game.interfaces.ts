export interface Game {
  slug: string;
  name: string;
  id: number;
  genres: string[];
  released: string;
  imageId: string;
  screenshotIds: string[];
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

export interface GameListPayload {
  gameList: UserGame[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
  counts: {
    gamesToPlay: number;
    gamesPlayed: number;
  };
}
