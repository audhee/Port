/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        bg: '#0E120F',
        'bg-secondary': '#111612',
        surface: '#111612',
        'surface-elevated': '#1A211D',
        text: '#E5EBE7',
        'text-secondary': '#B4C5BA',
        'text-muted': '#748095',
        primary: '#B4C5BA',
        secondary: '#48565E',
        accent: '#748095',
        border: 'rgba(72, 86, 94, 0.3)',
      },
      letterSpacing: {
        'tight-heading': '-0.025em',
        'tighter-heading': '-0.03em',
      },
    },
  },
  plugins: [],
};
