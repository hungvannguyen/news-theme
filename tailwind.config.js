/** @type {import("tailwindcss").Config} */
export default {
  content: ["./views/**/*.html", "./index.html"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        sm: "459px",
        md: "768px",
        lg: "992px",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "540px",
          md: "720px",
          lg: "960px",
        },
      },
      colors: {
        primary: "#ce0f2e",
        primary_50: "#fae7ea",
        gray_25: "#f7f7f7",
        "border-color": "rgba(131, 131, 131, 0.25)",
        "gray-900": "rgb(18, 18, 18)",
        "gray-800": "#242424",
      },
      fontFamily: {
        sans: ["IBM Plex Sans Arabic", "sans-serif"],
      },
      maxWidth: {
        xl: "1280px",
      },
      borderRadius: {
        radius: "8px",
      },
      fontSize: {},
    },
  },
  plugins: [],
};
