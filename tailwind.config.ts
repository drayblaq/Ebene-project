import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}','./lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F3EE',
        ebony: '#0E0B08',
        amber: '#C4763A',
        'amber-dark': '#A85E28',
        'dark-brown': '#1A1410',
      },
      fontFamily: {
        kablammo: ['Kablammo', 'system-ui'],
        serif: ['"DM Serif Display"', 'serif'],
        sans: ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
