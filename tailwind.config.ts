import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      colors: {
        primary: "#17191C",
        secondary: "#00B11C",
        highlight: "#25272B",
        background: "#1C1E22",
        text: "#FFFFFF7D",
        red: colors.red,
        green: colors.green,
      },
    },
  },
  plugins: [],
};
export default config;
