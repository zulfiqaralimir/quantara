import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B1F33",
        teal: "#1FB6A6",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};

export default config;
