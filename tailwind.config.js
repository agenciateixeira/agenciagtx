/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.25rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        green: {
          50: '#f7fce8',
          100: '#eef9d1',
          200: '#ddf3a3',
          300: '#cbec76',
          400: '#bae648',
          500: '#9ACD32',
          600: '#7BA428',
          700: '#5c7b1e',
          800: '#3d5214',
          900: '#1e290a',
        },
        gray: {
          50: '#F8F8F8',
          100: '#E0E0E0',
          200: '#CCCCCC',
          300: '#999999',
          400: '#666666',
          500: '#4A4A4A',
          600: '#2C2C2C',
          700: '#1F1F1F',
          800: '#141414',
          900: '#0A0A0A',
        },
        gtx: {
          green: '#9ACD32',
          'green-dark': '#7BA428',
          dark: '#2C2C2C',
          medium: '#666666',
          light: '#F8F8F8',
          border: '#E0E0E0',
        },
      },
      fontFamily: {
        sans: ['Lexend', 'system-ui', '-apple-system', 'sans-serif'],
        lexend: ['Lexend', 'sans-serif'],
      },
      boxShadow: {
        brand: '0 30px 60px rgba(34, 197, 94, 0.15)',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
}
