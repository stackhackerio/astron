module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#E5E7EB", // For lighter primary color
          DEFAULT: "#000000", // Normal primary color
          dark: "#314155", // Used for hover, active, etc.
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("kutty")],
}
