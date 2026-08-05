/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0F0F10',
          secondary: '#18181B',
        },
        card: '#222228',
        pink: {
          DEFAULT: '#F3A6B6',
          soft: '#FFD6E0',
        },
        cream: '#F8F5F2',
        gold: '#D8B46A',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      boxShadow: {
        soft: '0 20px 60px -15px rgba(0,0,0,0.5)',
        glow: '0 0 40px -5px rgba(243,166,182,0.35)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
