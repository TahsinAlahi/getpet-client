/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "serif"],
        coiny: ["Coiny", "serif"],
        openSans: ["Open Sans", "sans-serif"],
      },
      colors: {
        primary: "#fff9f0",
        secondary: "#f7f2eb",
        "dark-primary": "#081f5c",
        "dark-secondary": "#334eac",
        "btn-primary": "#bad6eb",
        "btn-secondary": "#7096d1",
        tertiary: "#d0e3ff",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
