import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8EE",
        peach: "#FFD8B5",
        sky: "#BDE0FE",
        lilac: "#E8C8FF",
        mint: "#C6F1D6",
        rose: "#FF7AA2",
        "rose-deep": "#E55C84",
        sun: "#FFE08A",
        grass: "#BFE3A2",
      },
      fontFamily: {
        cute: ["'Baloo 2'", "ui-rounded", "system-ui", "sans-serif"],
        hand: ["'Caveat'", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;