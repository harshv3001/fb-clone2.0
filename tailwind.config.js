module.exports = {
  node: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {},
  variants: {
    background: ["responsive", "hover"],
    extend: {
      border: ["active"],
      padding: ["responsive"],
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
