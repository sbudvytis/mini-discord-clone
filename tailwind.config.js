/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
    },
    extend: {
      spacing: {
        13: '3.25rem',
      },
      dropShadow: {
        '3xl': '5px 5px 25px rgba(0, 0, 0, 0.10)',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
