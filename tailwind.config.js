/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  plugins: [require('prettier-plugin-tailwindcss')],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      textColor: {
        primary: {
          light: '#F5F8FA',
          dark: '#0f1419',
        },
        secondary: {
          light: '#E1E8ED',
          dark: '#657786',
        },
        muted: {
          light: '#AAB8C2',
          dark: '#AAB8C2',
        },
      },

      backgroundColor: {
        primary: {
          light: '#ffff',
          dark: '#000',
        },
        secondary: {
          light: '#f3f4f6',
          dark: '#16181c',
        },
      },

      colors: {
        // ...
        primary: {
          hover: '#2e8eee',
          DEFAULT: '#1DA1F2',
          main: '#2081e2',
        },
      },
    },
  },
  plugins: [],
}
