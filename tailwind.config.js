/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/main.js"],
  theme: {
    colors: {
      primaryCustom: "#5a78ff",
      secondaryCustom: "#0957ff",
      darkGrayishBlue: "hsl(227, 12%, 61%)",
      brightRed: "hsl(12, 88%, 59%)",
    },
    extend: {
      colors: {
        primaryCustom: "#5a78ff",
        secondaryCustom: "#0957ff",
        darkGrayishBlue: "hsl(227, 12%, 61%)",
        brightRed: "hsl(12, 88%, 59%)",
      },
    },
  },
  plugins: [],
};
