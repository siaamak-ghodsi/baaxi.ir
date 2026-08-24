import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        baax: {
          blue: {
            50: "#eff6ff",
            100: "#dbeafe",
            200: "#bfdbfe",
            500: "#2563eb",
            600: "#1d4ed8",
            700: "#1e40af",
            800: "#1e3a8a",
            900: "#172554",
          },
          purple: {
            500: "#7c3aed",
            600: "#6d28d9",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-vazirmatn)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
