// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "gameState",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
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
    googleApplicationCredentials: "",
    session: {
      maxAge: 60 * 60 * 24 * 7,
    },
  },
  compatibilityDate: "2024-07-06",
});
