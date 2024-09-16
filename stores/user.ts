import { defineStore } from "pinia";
import type { LoginPayload } from "~/types/auth.interfaces";

export const useUserStore = defineStore("user", () => {
  // State
  const displayName = ref("");
  const email = ref("");
  const UID = ref("");
  const isLogged = ref(false);

  // Actions
  function setUser(userData: LoginPayload) {
    UID.value = userData.uid;
    email.value = userData.email;
    displayName.value = userData.username;
    isLogged.value = true;
  }

  function logOut() {
    displayName.value = "";
    email.value = "";
    UID.value = "";
    isLogged.value = false;
  }

  return {
    displayName,
    email,
    UID,
    isLogged,
    setUser,
    logOut,
  };
});
