// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },

  ssr: false,

  modules: ["@nuxtjs/tailwindcss"],

  css: ["~/assets/css/main.css"],

  app: {
    // Project Pages: https://<user>.github.io/baaxi.ir/
    baseURL: "/baaxi.ir/",
    head: {
      htmlAttrs: { dir: "rtl", lang: "fa" },
      title: "باکس — مدیریت صندوق",
      meta: [
        {
          name: "description",
          content: "ابزار مدیریت صندوق قرعه‌کشی و پس‌انداز/وام — baaxi.ir",
        },
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
        "/ledger",
        "/quick-buy",
        "/fund/rosca-12",
        "/fund/savings-loan-8",
        "/fund/rosca-24-large",
      ],
    },
  },

  tailwindcss: {
    configPath: "tailwind.config.ts",
  },
});
