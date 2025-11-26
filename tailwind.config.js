/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-blue-100', 'bg-blue-600', 'text-blue-600', 'text-blue-900',
    'bg-emerald-100', 'bg-emerald-600', 'text-emerald-600', 'text-emerald-700',
    'bg-amber-100', 'bg-amber-600', 'text-amber-600', 'text-amber-700',
    'bg-purple-100', 'bg-purple-600', 'text-purple-600', 'text-purple-700',
    'bg-red-100', 'bg-red-600', 'text-red-600', 'text-red-700',
    'bg-yellow-100', 'text-yellow-600', 'text-yellow-700',
    'bg-green-100', 'text-green-600', 'text-green-700',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b9dfff',
          300: '#7cc4ff',
          400: '#36a6ff',
          500: '#0c89f5',
          600: '#006bd1',
          700: '#0054a8',
          800: '#00478a',
          900: '#1e3a5f',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}