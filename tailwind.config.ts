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
      fontFamily: {
        sans: ['PT Sans', 'sans-serif'],
      },
      fontSize: {
        'xs': '.8rem',
        'sm': '.9rem',
        'base': '1rem',
        'lg': '1.1rem',
      },
      borderRadius: {
        DEFAULT: '.6rem',
      },
      // letterSpacing: {
      //   DEFAULT: '15em', // Add this line for default letter spacing
      // },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'custom': '0 4px 4px 3px rgba(0, 0, 0, 0.25)',
        'custom-active-project': '0 0 .25rem .10rem rgba(103, 103, 103, .40)',
      },
      colors: {
        "hubfolio-primary": "rgb(var(--hubfolio-primary))",
        "hubfolio-primary-01": "rgb(var(--hubfolio-primary-01))",
        "hubfolio-primary-02": "rgb(var(--hubfolio-primary-02))",
        "hubfolio-primary-03": "rgb(var(--hubfolio-primary-03))",
        "hubfolio-accent": "rgb(var(--hubfolio-accent))",
        "hubfolio-border": "rgb(var(--hubfolio-border))",
        "hubfolio-subtext": "rgb(var(--hubfolio-subtext))",
        "hubfolio-text": "rgb(var(--hubfolio-text))",
        "hubfolio-text-header": "rgb(var(--hubfolio-text-header))",
        "hubfolio-bg": "rgb(var(--hubfolio-bg))",
        "hubfolio-bg-content": "rgb(var(--hubfolio-bg-content))",
        "hubfolio-subtext-darker": "rgb(var(--hubfolio-subtext-darker))"
      },
      keyframes: {
        slideDown: {
          from: { height: '0px' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        slideUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0px' },
        },
      },
      animation: {
        slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
