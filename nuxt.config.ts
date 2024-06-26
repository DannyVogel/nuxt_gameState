// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["@/assets/css/tailwind.css"],
  tailwindcss: {
    viewer: false,
  },
  modules: [
    "@nuxt/ui",
    "@nuxt/fonts",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vite-pwa/nuxt",
  ],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  build: {
    transpile: ["pinia-plugin-persistedstate"],
  },
  pwa: {
    manifest: {
      name: "gameState",
      short_name: "gameState",
      description: "A simple game tracker powered by IGDB",
      theme_color: "#0F044C",
      lang: "en",
      display: "standalone",
      icons: [
        {
          src: "/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
        {
          src: "/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/apple-touch-icon.png",
          sizes: "128x128",
          type: "image/png",
        },
      ],
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
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
