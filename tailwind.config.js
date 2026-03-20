/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black:  '#080705',
        deep:   '#0f0e0b',
        card:   '#141210',
        gold:   '#c6a84b',
        'gold-light': '#e0c97a',
        cream:  '#ede5d0',
        muted:  '#7a7264',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans:  ['var(--font-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
