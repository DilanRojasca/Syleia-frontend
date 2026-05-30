/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
    './shared/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          DEFAULT: '#ECE6DA',
          dark: '#E2DAC8',
        },
        paper: '#F4EFE3',
        ink: {
          DEFAULT: '#3B342B',
          soft: '#6B6055',
        },
        line: '#BDB2A1',
        lilac: '#C9B8E8',
        // swatch palette
        blush: '#F4C5C0',
        champagne: '#F5E6C8',
        mint: '#C5DDD3',
        nude: '#E8D5C0',
        'warm-gold': '#D4B896',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.8rem, 6vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading': ['clamp(1.8rem, 3vw, 2.5rem)', { lineHeight: '1.2' }],
        'subheading': ['1.25rem', { lineHeight: '1.4' }],
      },
      boxShadow: {
        'card': '0 2px 12px rgba(59, 52, 43, 0.08)',
        'card-hover': '0 8px 32px rgba(59, 52, 43, 0.14)',
        'sticky': '0 1px 0 #BDB2A1',
      },
      borderRadius: {
        'card': '12px',
        'pill': '9999px',
      },
      transitionTimingFunction: {
        'silk': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out both',
        'slide-up': 'slideUp 0.6s ease-out both',
        'marquee': 'marquee 24s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
