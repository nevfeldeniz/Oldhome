/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          white: '#FFFFFF',
          alt: '#F9F9F7',
        },
        cream: '#f5efe3',
        parchment: '#faf6ec',
        sand: '#e8dcc4',
        wine: {
          DEFAULT: '#6e2b3d',
          dark: '#511f2c',
          light: '#8c4255',
          soft: '#a05a6b',
        },
        ink: '#33272b',
        charcoal: {
          900: '#1a1a1a',
          800: '#262626',
          700: '#333333',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        ui: '12px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(110, 43, 61, 0.05)',
        'card-hover': '0 6px 20px rgba(110, 43, 61, 0.08)',
        nav: '0 2px 16px rgba(110, 43, 61, 0.06)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}
