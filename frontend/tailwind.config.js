/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          50:  '#fdf8f0',
          100: '#faefd9',
          200: '#f4d9a8',
          300: '#ecbc6a',
          400: '#e49d38',
          500: '#d4831c',
          600: '#b86614',
          700: '#924e12',
          800: '#783f16',
          900: '#643415',
        },
        ink: {
          50:  '#f4f5f9',
          100: '#e8ebf4',
          200: '#c8cfe0',
          300: '#9aa3bc',
          400: '#6b7a99',
          600: '#3a4460',
          700: '#252c40',
          800: '#1a1f2e',
          900: '#111520',
          950: '#0a0d14',
        },
      },
    },
  },
  plugins: [],
}
