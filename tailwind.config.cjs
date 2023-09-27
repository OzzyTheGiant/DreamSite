/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite/plugin")

// $color-main: #063C73;
// $color-neutral: #0F2738;
// $color-accent: #F8C843;
// $color-secondary: #087F8C;

module.exports = {
  plugins: [flowbite],
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    "./node_modules/flowbite-svelte/**/*.{js,html,svelte,ts}",
    "./node_modules/flowbite-svelte-blocks/**/*.{js,html,svelte,ts}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Palette is generated using a Material Design Color Palette generator. Default shade is 500
        primary: {
          50: '#e1e8ee',
          100: '#b4c5d5',
          200: '#839eb9',
          300: '#51779d',
          400: '#2b5988',
          500: '#063c73',
          600: '#05366b',
          700: '#042e60',
          800: '#032756',
          900: '#021a43',
        },

        accent: {
          50: '#fef8e8',
          100: '#fdefc7',
          200: '#fce4a1',
          300: '#fad97b',
          400: '#f9d05f',
          500: '#f8c843',
          600: '#f7c23d',
          700: '#f6bb34',
          800: '#f5b42c',
          900: '#f3a71e',
        },

        neutral: {
          50: '#e2e5e7',
          100: '#b7bec3',
          200: '#87939c',
          300: '#576874',
          400: '#334756',
          500: '#0f2738',
          600: '#0d2332',
          700: '#0b1d2b',
          800: '#081724',
          900: '#040e17',
        }
      }
    },
  },
}
