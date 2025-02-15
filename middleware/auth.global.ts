export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession();
  if (!loggedIn.value && to.path !== "/") {
    return navigateTo({ path: "/", query: { auth: "true" } });
  }
});
