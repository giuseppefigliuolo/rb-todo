/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#261041',
        primaryLight: '#261041',
        danger: '#D91B24',
        warning: '#FFA201',
        accent: '#8400FF'
      }
    }
  },
  plugins: []
}
