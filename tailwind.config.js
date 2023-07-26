/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spinach: {
          DEFAULT: "hsl(109, 100%, 16%)",
          50: "#f7ffed",
          100: "#cbffb5",
          200: "hsl(105, 91%, 74%)",
          300: "hsl(106, 47%, 53%)",
          400: "hsl(107, 100%, 22%)",
          500: "hsl(108, 100%, 19%)",
          600: "hsl(109, 100%, 16%)",
          700: "hsl(111, 100%, 14%)",
          800: "hsl(112, 100%, 11%)",
          900: "hsl(115, 100%, 6%)",
        },
      },
    },
  },
};
