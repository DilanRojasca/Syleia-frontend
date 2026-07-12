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
        bg: '#F7F3EC',
        sand: {
          DEFAULT: '#F7F3EC',
          dark: '#EFE8DD',
        },
        paper: '#FCFAF6',
        // Negro — color principal: títulos y logotipo
        ink: {
          DEFAULT: '#000000',
          soft: '#5F5B55',
        },
        line: '#DCD4C8',
        'line-soft': '#E6DFD4',
        // Rosa empolvado #E4A7AC — color secundario: palabras destacadas
        accent: {
          DEFAULT: '#E4A7AC',
          deep: '#C9838A',
          tint: '#F9EEEF',
          'tint-2': '#F3E3E5',
        },
        // Verde salvia #B0BCA4 — color de apoyo: subtítulos e info secundaria
        salvia: {
          DEFAULT: '#B0BCA4',
          deep: '#7E8B72',
          tint: '#EFF2EA',
        },
        // Dorado y lila — acentos complementarios de la paleta
        gold: {
          DEFAULT: '#D4AB6D',
          tint: '#F7EFE1',
        },
        lilac: {
          DEFAULT: '#C5B0CF',
          tint: '#F4EFF6',
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
