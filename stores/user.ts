export const useUserStore = defineStore("user", () => {
  // State
  const isLogged = ref(false);
  const displayName = ref("");
  const id = ref("");
  const firstName = ref("");
  const lastName = ref("");
  const photoURL = ref("");

  // Actions
  function setOAuthUser(user: any) {
    id.value = user.sub;
    isLogged.value = true;
    firstName.value = user.given_name;
    lastName.value = user.family_name;
    photoURL.value = user.picture;
  }

  function logOut() {
    useListStore().clearList();
    displayName.value = "";
    isLogged.value = false;
    id.value = "";
    firstName.value = "";
    lastName.value = "";
    photoURL.value = "";
  }

  return {
    isLogged,
    id,
    displayName,
    firstName,
    lastName,
    photoURL,
    setOAuthUser,
    logOut,
  };
});
