import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0e1a',
        'background-secondary': '#111726',
        'accent-blue': '#3b82f6',
        'accent-blue-light': '#60a5fa',
        'accent-cyan': '#38bdf8',
        'accent-blue-dark': '#1d4ed8',
        'accent-gold': '#c9a84c',
        'accent-gold-light': '#e8c97a',
        'text-primary': '#f8fafc',
        'text-secondary': '#cbd9e8',
        'text-muted': '#9fb0c4',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'aurora': 'aurora 18s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 6s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
