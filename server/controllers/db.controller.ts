import { ref as fbRef, get, update, remove } from "firebase/database";
import type { Game } from "~/types/game.interfaces";
import { gameStateDB, db } from "../services/firebase";

export class DbController {
  static async getGameList(UID: string) {
    const listRef = fbRef(db, `gameState/users/${UID}/gameList`);
    const snapshot = await get(listRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  }

  static async addToList(UID: string, game: Game) {
    const updates: { [key: string]: Game } = {};
    updates[`/users/${UID}/gameList/${game.id}`] = game;
    update(gameStateDB, updates);
  }

  static async removeFromList(UID: string, gameID: Game["id"]) {
    const gameRef = fbRef(db, `gameState/users/${UID}/gameList/${gameID}`);
    remove(gameRef);
  }
}
