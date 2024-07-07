import type { Game } from "~/types/game.interfaces";
import { db } from "../services/firebase";

export class DbController {
  static async getGameList(UID: string) {
    const listRef = db.ref(`gameState/users/${UID}/gameList`);
    const snapshot = await listRef.once("value");
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      return null;
    }
  }

  static async addToList(UID: string, game: Game) {
    const updates: { [key: string]: any } = {};
    updates[`gameState/users/${UID}/gameList/${game.id}`] = game;
    db.ref().update(updates);
  }

  static async removeFromList(UID: string, gameID: Game["id"]) {
    const gameRef = db.ref(`gameState/users/${UID}/gameList/${gameID}`);
    gameRef.remove();
  }
}
