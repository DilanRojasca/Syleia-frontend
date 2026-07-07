import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './domain/**/*.{ts,tsx}',
    './application/**/*.{ts,tsx}',
    './infrastructure/**/*.{ts,tsx}',
    './ui/**/*.{ts,tsx}',
    './shared/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#ECE6DA',
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
        'line-soft': '#CDC5B5',
        accent: {
          DEFAULT: '#CCA09D',
          deep: '#B5625C',
          tint: '#F4EDED',
          'tint-2': '#EDE2E1',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '2px',
        md: '4px',
        lg: '4px',
        pill: '9999px',
        card: '4px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(59, 52, 43, 0.08)',
        'card-hover': '0 8px 32px rgba(59, 52, 43, 0.14)',
        sticky: '0 1px 0 #BDB2A1',
        drawer: '-12px 0 40px rgba(40, 32, 28, 0.18)',
        toast: '0 8px 30px rgba(40, 32, 28, 0.25)',
        quickadd: '0 2px 10px rgba(48, 38, 32, 0.14)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out both',
        'slide-up': 'slideUp 0.6s ease-out both',
        marquee: 'marquee 24s linear infinite',
        'drawer-in': 'drawerIn 0.3s cubic-bezier(0.2, 0.7, 0.2, 1)',
        'toast-in': 'toastIn 0.25s cubic-bezier(0.2, 0.7, 0.2, 1)',
        'veil-in': 'veilIn 0.25s ease',
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
        drawerIn: {
          from: { transform: 'translateX(40px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        toastIn: {
          from: { transform: 'translate(-50%, 12px)', opacity: '0' },
          to: { transform: 'translate(-50%, 0)', opacity: '1' },
        },
        veilIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
