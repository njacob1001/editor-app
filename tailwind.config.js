/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter, Inter)', 'Inter', 'sans-serif'],
        default: ['var(--font-default, Inter)', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
