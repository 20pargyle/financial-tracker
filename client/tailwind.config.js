import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: [ "emerald", "dim"],
  }
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