/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'serif'],
      },
      colors: {
        indigo: {
          100: '#D4E5FB',
          200: '#AAC8F7',
          300: '#7EA7ED',
          400: '#5C87E0',
          500: '#2F5BCF',
          600: '#2346B1',
          700: '#193494',
          800: '#102477',
          900: '#0A1A63',
        },
        gray: {
          100: '#F0F4F7',
          200: '#E1E8EF',
          300: '#C0C8D1',
          400: '#939AA4',
          500: '#59606A',
          600: '#474D55',
          700: '#353A40',
          800: '#24262A',
          900: '#1B1D20',
        },
      },
      width: {
        max: 'min(800px, 100vw - (40px * 2))',
      },
    },
  },
  plugins: [],
};
