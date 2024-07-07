// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/tailwind.css"],
  tailwindcss: {
    viewer: false,
  },
  modules: [
    "@nuxt/ui",
    "@nuxt/fonts",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/devtools",
    "@nuxt/image",
  ],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      link: [{ rel: "manifest", href: "/site.webmanifest" }],
    },
  },
  build: {
    transpile: ["pinia-plugin-persistedstate"],
  },
  image: {
    domains: ["images.igdb.com", "media.rawg.io"],
  },
  runtimeConfig: {
    IGDBClientId: "",
    IGDBClientSecret: "",
    firebase: {
      apiKey: "",
      authDomain: "",
      projectId: "",
      appId: "",
      databaseURL: "",
      storageBucket: "",
      messagingSenderId: "",
    },
    firebaseAdminId: "",
  },
  compatibilityDate: "2024-07-06",
});
