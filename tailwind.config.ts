import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#EA5B0C",
          dark: "#B8480A",
          light: "#FDE8D8",
        },
      },
    },
  },
  plugins: [],
};

export default config;
