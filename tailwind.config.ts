import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bee': {
          'bg': '#FFF8D6',
          'yellow': '#FFD83D',
          'text': '#111111',
          'card': '#FFFFFF',
        }
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config
