// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  tailwindcss: {
    viewer: false,
  },
  modules: [
    "@nuxt/ui",
    "@nuxt/fonts",
    "@nuxt/devtools",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "nuxt-auth-utils",
  ],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      link: [{ rel: "manifest", href: "/site.webmanifest" }],
    },
  },
  image: {
    domains: ["images.igdb.com", "media.rawg.io"],
  },
  $development: {
    runtimeConfig: {
      googleRedirectURL: "http://localhost:3000/api/auth/google",
    },
  },
  runtimeConfig: {
    IGDBClientId: "",
    IGDBClientSecret: "",
    firebaseAdminId: "",
    databaseURL: "",
    session: {
      maxAge: 60 * 60 * 24 * 7,
    },
  },
  compatibilityDate: "2024-07-06",
});
