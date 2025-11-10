module.exports = {
  content: [
    "./index.html",
    "./*.tsx",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--zmp-primary-color)",
        gray: "#767A7F",
        divider: "#E9EBED",
        green: "#288F4E",
        background: "#ffffff",
        skeleton: "rgba(0, 0, 0, 0.1)",
      },
    },
  },
};
