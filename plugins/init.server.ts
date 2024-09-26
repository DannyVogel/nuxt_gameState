export default defineNuxtPlugin(async (nuxtApp) => {
  const userStore = useUserStore();
  const listStore = useListStore();
  const { user } = useUserSession();

  const { data, execute } = await useAsyncData(
    "getGameList",
    () => useRequestFetch()("/api/game-list"),
    {
      immediate: false,
    }
  );

  if (user.value) {
    userStore.setOAuthUser(user.value);
    await execute();
    listStore.gameList = data.value?.payload.gameList || [];
  }
});
