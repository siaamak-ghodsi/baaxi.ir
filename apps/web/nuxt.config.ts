// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },

  ssr: false,

  modules: ["@nuxtjs/tailwindcss"],

  css: ["~/assets/css/main.css"],

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || "/",
    head: {
      htmlAttrs: { dir: "rtl", lang: "fa" },
      title: "باکس",
      meta: [
        { name: "description", content: "باکس — baaxi.ir" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&display=swap",
        },
      ],
    },
  },

  nitro: {
    preset: "github_pages",
    prerender: {
      crawlLinks: true,
      routes: [
        "/",
        "/login",
        "/signup",
        "/member",
        "/member/browse",
        "/ledger",
        "/quick-buy",
        "/organizer",
        "/admin",
        "/fund/rosca-12",
        "/fund/savings-loan-8",
        "/fund/rosca-24-large",
        "/organizer/fund/rosca-12",
        "/organizer/fund/savings-loan-8",
        "/organizer/fund/rosca-24-large",
      ],
    },
  },

  tailwindcss: {
    configPath: "tailwind.config.ts",
  },
});
