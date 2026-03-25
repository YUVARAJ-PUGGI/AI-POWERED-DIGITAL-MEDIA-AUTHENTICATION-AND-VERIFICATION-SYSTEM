/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0f',
          800: '#13131a',
          700: '#1f1f2e',
          600: '#2d2d3f',
        },
        neon: {
          blue: '#3b82f6',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
        }
      }
    },
  },
  plugins: [],
}
