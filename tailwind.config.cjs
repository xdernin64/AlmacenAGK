/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        gdark: '#4c4c4c83',
        mtuserbg: '#01579b',
        }
    },
    
  },
  plugins: [],
})
