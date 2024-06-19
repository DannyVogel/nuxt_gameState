// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  tailwindcss: {
    viewer: false,
  },
  modules: ["@nuxt/ui", "@nuxt/fonts", "@pinia/nuxt"],
  runtimeConfig: {
    public: {
      firebase: {
        apiKey: "AIzaSyDvZtRn9B9OgWOIVHnICiq0_eoNreJBUs0",
        authDomain: "AIzaSyDvZtRn9B9OgWOIVHnICiq0_eoNreJBUs0",
        projectId: "gamestate-327e2",
        appId: "1:168937433606:web:0919320d20ca2f94033187",
        databaseURL:
          "https://gamestate-327e2-default-rtdb.europe-west1.firebasedatabase.app",
        storageBucket: "gamestate-327e2.appspot.com",
        messagingSenderId: "168937433606",
      },
    },
  },
});