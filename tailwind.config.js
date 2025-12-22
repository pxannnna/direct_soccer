/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'soccer-blue': '#1e40af',
        'soccer-green': '#059669',
        'soccer-light-blue': '#3b82f6',
        'soccer-light-green': '#10b981',
      },
    },
  },
  plugins: [],
}

