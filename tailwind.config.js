/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#3a7afe', // Reference blue from image
          dark: '#20212b',  // Portfolio deep background
          light: '#f5f7fa', // Portfolio light background
          gray: {
            900: '#232334', // Card/section bg dark
            800: '#33334f',
            200: '#ebebf2', // Card/section light
            100: '#fbfbff',
          },
        },
      },
    },
  },
  plugins: [],
}

