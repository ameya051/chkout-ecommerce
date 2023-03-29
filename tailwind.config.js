/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      safelist: ['animate-[fade-in_1s_ease-in-out]']
    },
  },
  plugins: [],
}
