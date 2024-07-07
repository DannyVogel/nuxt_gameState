import { defineStore } from "pinia";
import type { LoginPayload } from "~/types/auth.interfaces";
import type { UserGame } from "~/types/game.interfaces";

export const useUserStore = defineStore({
  id: "userStore",
  state: () => ({
    displayName: "",
    email: "",
    UID: "",
    isLogged: false,
    gameList: [] as UserGame[],
  }),
  getters: {
    getGamesToPlay(state) {
      return state.gameList
        .filter((game) => game.status === "toPlay")
        .sort((a, b) => {
          return a.released.localeCompare(b.released);
        });
    },
    getGamesPlayed(state) {
      return state.gameList
        .filter((game) => game.status !== "toPlay")
        .sort((a, b) => {
          if (b.yearPlayed === a.yearPlayed) {
            return b.monthPlayed - a.monthPlayed;
          } else {
            return b.yearPlayed - a.yearPlayed;
          }
        });
    },
    getYearsPlayed(state) {
      return state.gameList
        .filter((game) => game.status !== "toPlay")
        .map((game) => game.yearPlayed)
        .filter((year, index, self) => self.indexOf(year) === index)
        .sort((a, b) => b - a);
    },
  },
  actions: {
    setUser(userData: LoginPayload) {
      this.UID = userData.uid;
      this.email = userData.email;
      this.gameList = userData.gameList;
      this.displayName = userData.username;
      this.isLogged = true;
    },
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
