/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Adding some professional CV colors
        primary: '#2c3e50',
        secondary: '#34495e',
        accent: '#e67e22',
      },
    },
  },
  plugins: [],
}