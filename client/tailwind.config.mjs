/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    daisyui: {
      themes: [ "emerald", "dracula" ],
    },
  },
  plugins: [
    require("daisyui"),
  ],
};


// "base": {
//   "primary": "#3b82f6",
//   "secondary": "#e5e7eb",
//   "accent": "#f5d0fe",
//   "neutral": "#fae8ff",
//   "base-100": "#6b21a8",
//   "info": "#e879f9",
//   "success": "#15803d",
//   "warning": "#eab308",
//   "error": "#9f1239",