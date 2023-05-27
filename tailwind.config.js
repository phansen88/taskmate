/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orchid': {
          '50': '#faf5fa',
          '100': '#f6edf5',
          '200': '#efdbee',
          '300': '#e3bee0',
          '400': '#d195cb',
          '500': '#c074b7',
          '600': '#b163a3',
          '700': '#924481',
          '800': '#793b6b',
          '900': '#66355b',
          '950': '#3d1a35',
      }
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}