/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Tabeladaki krem zemin tonları (açık arka planlar)
        cream: '#f5efe3',
        parchment: '#faf6ec',
        sand: '#e8dcc4',
        // Tabela & logo bordo / şarap rengi (marka vurgusu)
        wine: {
          DEFAULT: '#6e2b3d',
          dark: '#511f2c',
          light: '#8c4255',
          soft: '#a05a6b',
        },
        // Sıcak koyu metin rengi
        ink: '#33272b',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Merriweather', 'serif'],
        sans: ['Montserrat', 'Lato', 'system-ui', 'sans-serif'],
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
