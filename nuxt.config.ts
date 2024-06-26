// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["@/assets/css/tailwind.css"],
  tailwindcss: {
    viewer: false,
  },
  modules: ["@nuxt/ui", "@nuxt/fonts", "@pinia/nuxt"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
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
