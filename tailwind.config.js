/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      safelist: ['animate-[fade-in_1s_ease-in-out]'],
      keyframes:{
        mobileNav: {
          '0%': {transform: 'translateX(100%)'},
          '100%': {transform: 'translateX(0%)'}
        }
      },
      animation: {
        mobileNav: 'mobileNav 0.3s ease-in-out'
      }
    },
  },
  plugins: [],
}
