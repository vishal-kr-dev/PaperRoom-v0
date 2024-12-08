/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        "primary-bg": "#121212",
        "secondary-bg": "#1d1d1d",
        "hover": "#353535",
        "accent": "#6200ed",
        "muted-gray": "#2d2d2d",
      },
    },
  },
  plugins: [],
};
//#6200ed purple
// #3700b3 blue