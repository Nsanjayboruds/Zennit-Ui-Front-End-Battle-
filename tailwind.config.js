module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#34D399",
        secondary: "#60A5FA",
        accent: "#F472B6",
        bg: "#F8FAFC"
      },
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui"] },
    },
  },
  plugins: [],
}
