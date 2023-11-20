// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {},
  plugins: [
    require('@tailwindcss/typography')
  ],
}
