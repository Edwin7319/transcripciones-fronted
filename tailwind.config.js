/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'Helvetica Neue', 'sans-serif'],
    },
    extend: {
      zIndex: {
        '999': '999',
      },
      height: {
        '80vh': '80vh',
      },
      colors: {
        transcription: {
          50: '#75c3f1',
          100: '#45a9e6',
          200: '#3599d5',
          300: '#2b8dc8',
          400: '#287aac',
          500: '#095782',
          600: '#084261',
          700: '#042b3e',
          800: '#042433',
          900: '#021e2a',
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
