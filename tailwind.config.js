/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./views/**/*.html", './index.html',],
  theme: {
    extend: {
      keyframes: {
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
            visibility: 'hidden',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
            visibility: 'visible',
          },
        },
      },
      animation: {
        'fade-up-0.45': 'fade-up 0.45s linear',
        'fade-up-0.5': 'fade-up 0.5s linear',
      },
      screens: {
        xs: '0px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1400px',
      },
      colors: {
        'dark': '#161616',
      },
      fontSize: {
        xs: ['0.75rem', '1.25'],
        sm: ['0.875rem', '1.25'],
        base: ['1rem', '1.25'],
        lg: ['1.125rem', '1.25'],
        xl: ['1.25rem', '1.25'],
        '2xl': ['1.45rem', '1.25'],
        '3xl': ['1.875rem', '1.25'],
        '4xl': ['2.25rem', '1.25'],
        '5xl': ['3rem', '1.25'],
        '6xl': ['3.57rem', '1.25'],
      }
    }
  },
  plugins: [],
}

