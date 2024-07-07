export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  if (!userStore.isLogged && to.path !== "/") {
    return navigateTo({ path: "/", query: { auth: "true" } });
  }
});
