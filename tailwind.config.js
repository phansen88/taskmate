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
      },
      'chestnut': {
        '50': '#fcf5f4',
        '100': '#f9eae7',
        '200': '#f5d8d3',
        '300': '#ecbdb5',
        '400': '#e0978b',
        '500': '#d07263',
        '600': '#bb5747',
        '700': '#9d4638',
        '800': '#823d32',
        '900': '#6d382f',
        '950': '#3a1a15',
    },
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}