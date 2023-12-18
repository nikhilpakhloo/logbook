/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#353535"
      },
      fontFamily: {
        'nanum-square-neo': ['NanumSquareNeo', 'sans-serif'],
        'pp-pangram-sans': ['PP Pangram Sans', 'sans-serif'],
        'pangram': ['Pangram', 'sans-serif'],
        'sf-pro': ['SF Pro', 'sans-serif'],
        'spoqa-hans-sans-neo': ['Spoqa Hans Sans Neo', 'sans-serif'],
    },
    boxShadow: {
      'violet-drop': '0 0 60px rgba(138, 43, 226, 0.5)',
    },
    filter: {
      'violet-shadow': 'drop-shadow(0 0 8px rgba(138, 43, 226, 0.5))',
    },
  },
},
  plugins: [],
}