/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A44B1',
          hover: '#08368d',
        },
        accent: '#E8EE3B',
        background: '#FAFAF7',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'premium': '0 20px 50px -12px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 20px rgba(10, 68, 177, 0.12)',
        'button-hover': '0 10px 25px -5px rgba(10, 68, 177, 0.3)',
      }
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}
