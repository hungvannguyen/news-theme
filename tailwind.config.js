/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./views/**/*.html", './index.html',],
  theme: {
    extend: {
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

