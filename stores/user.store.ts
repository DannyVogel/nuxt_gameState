import { defineStore } from "pinia";
import type { UserGame } from "~/types/game.interfaces";

export const useUserStore = defineStore({
  id: "userStore",
  state: () => ({
    name: "Kelevra",
    UID: "",
    isLogged: false,
    gameList: [] as UserGame[],
  }),
  getters: {
    getGamesToPlay(state) {
      return state.gameList.filter((game) => game.status === "toPlay");
    },
    getGamesPlayed(state) {
      return state.gameList.filter((game) => game.status !== "toPlay");
    },
  },
  actions: {
    logOut() {
      this.isLogged = false;
      this.UID = "";
      this.gameList = [];
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
