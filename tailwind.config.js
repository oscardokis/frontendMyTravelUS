/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {aspectRatio: {
      '4/3': '4 / 3',
      '16/9': '16 / 9',
      '20/9': '20 / 9',
    },},
    colors: {
      bluelight: '#0e9fe1',
      transparent: 'transparent',
      white: '#ffffff',
      red: '#ff0000',
      black: '#000000',
      
    }
  },
  plugins: [],
}

