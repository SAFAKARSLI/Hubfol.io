import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "hubfolio-primary": "rgb(var(--hubfolio-primary))",
        "hubfolio-primary-dark": "rgb(var(--hubfolio-primary-dark))",
        "hubfolio-secondary": "rgb(var(--hubfolio-secondary))",
        "hubfolio-secondary-dark": "rgb(var(--hubfolio-secondary-dark))",

      },
    },
  },
  plugins: [],
};
export default config;
