/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        // primary: '#0d47a1',      // כחול כהה
        // medium: '#1976d2',       // כחול בינוני
        // light: '#bbdefb',        // תכלת
        // sea: '#0288d1',          // כחול ים לכפתורים
        // veryLight: '#e3f2fd',    // כחול בהיר מאוד לרקע
        blue: '#4b42f7', //button
        darkblue: '#13131c',//headline
        gray: '#505050',//paragraf
        light: '#eae9ff',//spetial button
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

