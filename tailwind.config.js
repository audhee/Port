/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
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
      grayscale: {
        40: '40%',
      },
      letterSpacing: {
        'tight-heading': '-0.025em',
        'tighter-heading': '-0.03em',
      },
    },
  },
  plugins: [],
};
