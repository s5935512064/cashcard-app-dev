// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  modules: [
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Roboto: true,
          Inter: [400, 700],
          "Josefin+Sans": true,
          Lato: [100, 300],
          Raleway: {
            wght: [100, 400],
            ital: [100],
          },
        },
      },
    ],
    "@pinia/nuxt",
    "dayjs-nuxt",
    "@vueuse/motion/nuxt",
  ],
  runtimeConfig: {
    apiToken: process.env.API_TOKEN,
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      lineliff: process.env.LIFF_ID,
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
