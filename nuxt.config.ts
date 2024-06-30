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
  runtimeConfig: {
    IGDBClientId: "",
    IGDBClientSecret: "",
    public: {
      firebase: {
        apiKey: "",
        authDomain: "",
        projectId: "",
        appId: "",
        databaseURL: "",
        storageBucket: "",
        messagingSenderId: "",
      },
    },
  },
});
