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
      colors: {
        violet: {
          1: 'var(--violet-1)',
          2: 'var(--violet-2)',
          3: 'var(--violet-3)',
          4: 'var(--violet-4)',
          5: 'var(--violet-5)',
          6: 'var(--violet-6)',
          7: 'var(--violet-7)',
          8: 'var(--violet-8)',
          9: 'var(--violet-9)',
          10: 'var(--violet-10)',
          11: 'var(--violet-11)',
          12: 'var(--violet-12)',
          a1: 'var(--violet-a1)',
          a2: 'var(--violet-a2)',
          a3: 'var(--violet-a3)',
          a4: 'var(--violet-a4)',
          a5: 'var(--violet-a5)',
          a6: 'var(--violet-a6)',
          a7: 'var(--violet-a7)',
          a8: 'var(--violet-a8)',
          a9: 'var(--violet-a9)',
          a10: 'var(--violet-a10)',
          a11: 'var(--violet-a11)',
          a12: 'var(--violet-a12)',
          contrast: 'var(--violet-contrast)',
        },
        gray: {
          1: 'var(--gray-1)',
          2: 'var(--gray-2)',
          3: 'var(--gray-3)',
          4: 'var(--gray-4)',
          5: 'var(--gray-5)',
          6: 'var(--gray-6)',
          7: 'var(--gray-7)',
          8: 'var(--gray-8)',
          9: 'var(--gray-9)',
          10: 'var(--gray-10)',
          11: 'var(--gray-11)',
          12: 'var(--gray-12)',
          a1: 'var(--gray-a1)',
          a2: 'var(--gray-a2)',
          a3: 'var(--gray-a3)',
          a4: 'var(--gray-a4)',
          a5: 'var(--gray-a5)',
          a6: 'var(--gray-a6)',
          a7: 'var(--gray-a7)',
          a8: 'var(--gray-a8)',
          a9: 'var(--gray-a9)',
          a10: 'var(--gray-a10)',
          a11: 'var(--gray-a11)',
          a12: 'var(--gray-a12)',
          contrast: 'var(--gray-contrast)',
          surface: 'var(--gray-surface)',
          indicator: 'var(--gray-indicator)',
          track: 'var(--gray-track)',
        }
      },
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
      // boxShadow: {
      //   'custom': '0 4px 4px 3px rgba(0, 0, 0, 0.25)',
      //   'custom-active-project': '0 0 .25rem .10rem rgba(103, 103, 103, .40)',
      // },
      // colors: {
      //   "hubfolio-primary": "rgb(var(--hubfolio-primary))",
      //   "hubfolio-primary-01": "rgb(var(--hubfolio-primary-01))",
      //   "hubfolio-primary-02": "rgb(var(--hubfolio-primary-02))",
      //   "hubfolio-primary-03": "rgb(var(--hubfolio-primary-03))",
      //   "hubfolio-accent": "rgb(var(--hubfolio-accent))",
      //   "hubfolio-border": "rgb(var(--hubfolio-border))",
      //   "hubfolio-subtext": "rgb(var(--hubfolio-subtext))",
      //   "hubfolio-text": "rgb(var(--hubfolio-text))",
      //   "hubfolio-text-header": "rgb(var(--hubfolio-text-header))",
      //   "hubfolio-bg": "rgb(var(--hubfolio-bg))",
      //   "hubfolio-bg-content": "rgb(var(--hubfolio-bg-content))",
      //   "hubfolio-subtext-darker": "rgb(var(--hubfolio-subtext-darker))"
      // },
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
