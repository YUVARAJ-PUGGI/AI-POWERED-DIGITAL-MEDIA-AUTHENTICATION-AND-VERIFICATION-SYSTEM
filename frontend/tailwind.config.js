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
          950: '#050510',
          900: '#0f1119',
          800: '#1a1f35',
          700: '#25293d',
          600: '#34394e',
        },
        primary: {
          50: '#f0f4ff',
          100: '#e6ecff',
          400: '#6366f1',
          500: '#4f46e5',
          600: '#4338ca',
          700: '#3730a3',
        },
        accent: {
          cyan: '#06b6d4',
          blue: '#3b82f6',
          purple: '#a855f7',
          indigo: '#6366f1',
          rose: '#f43f5e',
        },
        neon: {
          cyan: '#00d9ff',
          purple: '#d600ff',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.4)',
        'glow-purple': '0 0 30px rgba(168, 85, 247, 0.4)',
        'glow-blue': '0 0 30px rgba(59, 130, 246, 0.4)',
        'glow-lg': '0 0 50px rgba(6, 182, 212, 0.5)',
      },
      backdropFilter: {
        none: 'none',
        blur: 'blur(10px)',
      }
    },
  },
  plugins: [],
}
