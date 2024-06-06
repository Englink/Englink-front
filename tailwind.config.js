/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: 'media', // or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}


module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'yellow-button': '#ffff00', // הגדר את הצבע הצהוב שאתה רוצה להחיל
        primary: '#0d47a1',      // כחול כהה
        medium: '#1976d2',       // כחול בינוני

        sea: '#0288d1',          // כחול ים לכפתורים
        veryLight: '#e3f2fd',    // כחול בהיר מאוד לרקע
        purple: '#4b42f7', // סגול
        hnav: '#13131c',
        parag: '#505050',
        but: '#eae9ff',
        blue: '#4b42f7', //button
        darkblue: '#13131c',//headline
        gray: '#505050',//paragraf
        light: '#eae9ff'//spetial button


      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

