import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}','./lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        brown: '#814D2D',
        'brown-dark': '#5E3520',
      },
      fontFamily: {
        joti: ['"Joti One"', 'cursive'],
        sans: ['"Aoboshi One"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
