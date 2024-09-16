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
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-vuefire",
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
  vuefire: {
    auth: {
      enabled: true,
    },
    config: {
      apiKey: "",
      authDomain: "",
      projectId: "",
      appId: "",
      // there could be other properties depending on the project
    },
  },
  runtimeConfig: {
    IGDBClientId: "",
    IGDBClientSecret: "",
    firebaseAdminId: "",
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
  compatibilityDate: "2024-07-06",
});
