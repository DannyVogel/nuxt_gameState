// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  tailwindcss: {
    viewer: false,
  },
  modules: ["@nuxt/ui", "@nuxt/fonts", "@pinia/nuxt", "vue3-carousel-nuxt"],
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