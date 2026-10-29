import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        seoulea: {
          blush: "#E9A4B9",
          "blush-light": "#FDF2F4",
          "blush-soft": "#F7D6DF",
          "blush-dark": "#D87593",
          ivory: "#FFF9F2",
          "ivory-dark": "#F5EBE1",
          gold: "#C5A15B",
          "gold-light": "#E8D8B0",
          "gold-dark": "#9E7D37",
          cocoa: "#49363B",
          "cocoa-light": "#6B5359",
          "cocoa-dark": "#2E1F23",
          berry: "#B83B68",
          "berry-dark": "#92294F",
          "berry-light": "#DE6D94",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        boutique: "0 4px 20px -2px rgba(73, 54, 59, 0.08)",
        "boutique-lg": "0 10px 30px -4px rgba(73, 54, 59, 0.12)",
        gold: "0 4px 14px 0 rgba(197, 161, 91, 0.25)",
      },
      borderRadius: {
        boutique: "14px",
      },
    },
  },
  plugins: [],
};
export default config;
