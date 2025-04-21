/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-gold': '#FFD700',
        'dark-bg': '#0A0A0A',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 