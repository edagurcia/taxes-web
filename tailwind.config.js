/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00b894", // Modern green
      },
    },
  },
  darkMode: "class", // Enable dark mode with a class
  plugins: [],
};
