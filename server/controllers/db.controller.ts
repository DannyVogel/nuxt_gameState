import type { Game, UserGame } from "~/types/game.interfaces";
import { db } from "../services/firebase";

export class DbController {
  static async getGameList(UID: string) {
    const listRef = db.ref(`gameState/users/${UID}/gameList`);
    const snapshot = await listRef.once("value");
    if (snapshot.exists()) {
      return Object.values(snapshot.val()) as UserGame[];
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

  static async addLog(log: any) {
    try {
      const date = new Date();
      const logDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      log.date = logDate;
      const formattedDate = date.toISOString().split("T")[0];
      const timestamp = date.getTime();
      const logRef = db.ref(`gameState/logs/${formattedDate}/${timestamp}`);
      logRef.set(log);
    } catch (error) {
      console.log("failed to add log", error);
    }
  }
}
