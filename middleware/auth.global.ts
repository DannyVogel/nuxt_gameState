export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession();
  console.log("loggedIn", loggedIn.value);
  if (!loggedIn.value && to.path !== "/") {
    console.log("Not logged in, redirecting to /");
    return navigateTo({ path: "/", query: { auth: "true" } });
  }
});
