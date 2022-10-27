const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './common/**/*.{js,ts,jsx,tsx}',
    './assets/**/*.{js,ts,jsx,tsx}',
  ],
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './common/**/*.{js,ts,jsx,tsx}',
    './assets/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Euclid Circular A', ...defaultTheme.fontFamily.sans],
      },
      backgroundColor: '#000000',
      colors: {
        primary: '#278ace',
        'primary-hover': '#226ea4',
        'primary-light': 'rgba(250, 114, 104, 0.12)',
        'primary-2': '#CE81F4',
        border: 'rgba(221, 218, 218, 0.2)',
        secondary: '#7EFFE8',
        blue: '#49DEFF',
        accent: '#CE81F4',
        glow: '#278ace',
        accent: '#FFA500',
        'light-0': '#FFFFFF',
        'light-1': '#F0F1F3',
        'light-2': '#B1AFBB',
        'light-4': '#697b89',
        'medium-3': '#8D8B9B',
        'medium-4': '#6D6C7C',
        'dark-3': '#333333',
        'dark-4': '#161616',
        'dark-5': '#0B0B0B',
        'dark-6': '#000000',
        twitter: '#1DA1F2',
      },
    },
  },
  plugins: [],
}
