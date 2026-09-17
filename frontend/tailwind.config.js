/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1C1B19",      // near-black, warm undertone -- header/nav/footer
        ivory: "#F6F2EA",    // background
        parchment: "#EFE9DC",
        maroon: "#6E2A2A",   // primary accent
        gold: "#B9975B",     // secondary accent / ratings
        sage: "#6B7156",     // tertiary accent / tags
        line: "#DED6C4",     // hairline borders on ivory
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        sans: ["'Work Sans'", "sans-serif"],
      },
      maxWidth: {
        content: "1400px",
      },
    },
  },
  plugins: [],
};
