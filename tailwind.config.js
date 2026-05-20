/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#dae6ff",
          200: "#bdd3ff",
          300: "#90b5ff",
          400: "#5e8dff",
          500: "#3b6bff",
          600: "#264ef5",
          700: "#1f3cdb",
          800: "#1f33b0",
          900: "#1f308a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
