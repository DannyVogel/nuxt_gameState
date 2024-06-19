import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "userStore",
  state: () => ({
    user: {
      name: "Kelevra",
      UID: "123456",
      isLogged: false,
      gameList: [],
    },
  }),
  actions: {},
});
