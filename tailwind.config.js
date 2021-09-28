module.exports = {
  node: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screen: {
      "2md": "900px",
    },
  },
  variants: {
    background: ["responsive", "hover"],
    extend: {
      border: ["active"],
      padding: ["responsive"],
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
