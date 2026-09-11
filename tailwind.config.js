/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          bg: '#070705',
          text: '#ecede6',
          muted: '#c3c7b3',
          border: '#4e6046',
          accent: '#8ca888',
        },
      },
    },
  },
  plugins: [],
};
