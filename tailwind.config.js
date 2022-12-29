/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "576px",
        md: "768px",
        lg: "900px",
        xl: "1200px",
        "2xl": "1440px",
      },
      colors: {
        mainBg: "#1F2937",
        textColor: "#F3F4F6",
      },
      maxWidth: {
        "screen-sm": "530px",
        "screen-md": "730px",
        "screen-lg": "870px",
        "screen-xl": "1170px",
        "screen-2xl": "1410px",
      },
    },
  },
  plugins: [],
};
