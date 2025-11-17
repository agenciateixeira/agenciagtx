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
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        brand: {
          DEFAULT: 'var(--brand)',
          50: '#ecfee0',
          100: '#d4fdc0',
          200: '#aafc86',
          300: '#75f144',
          400: '#4ee61b',
          500: '#22c55e',
          600: '#17a445',
          700: '#167d39',
          800: '#155f33',
          900: '#124f2f',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
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
