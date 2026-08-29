import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        baax: {
          blue: {
            50: "#eff6ff",
            100: "#dbeafe",
            200: "#bfdbfe",
            300: "#93c5fd",
            400: "#60a5fa",
            500: "#2563eb",
            600: "#1d4ed8",
            700: "#1e40af",
            800: "#1e3a8a",
            900: "#172554",
          },
          purple: {
            50: "#faf5ff",
            100: "#f3e8ff",
            200: "#e9d5ff",
            500: "#7c3aed",
            600: "#6d28d9",
            700: "#5b21b6",
          },
        },
      },
      fontFamily: {
        sans: ["Vazirmatn", "system-ui", "sans-serif"],
        display: ["Estedad", "Vazirmatn", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(23 37 84 / 0.04), 0 1px 3px 0 rgb(23 37 84 / 0.06)",
        "card-hover": "0 2px 4px 0 rgb(23 37 84 / 0.06), 0 4px 8px 0 rgb(23 37 84 / 0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
