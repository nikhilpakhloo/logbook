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