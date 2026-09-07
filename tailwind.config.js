/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        er: {
          void: "#040405",
          bg: "#09090c",
          surface: "#111116",
          elevated: "#181820",
          border: "#2a2620",
          borderBright: "#544a39",
          gold: "#c5a059",
          goldBright: "#e6c378",
          goldDim: "#876f3b",
          goldMuted: "#4e4024",
          crimson: "#8a1616",
          crimsonBright: "#b91c1c",
          blood: "#5e0f0f",
          parchment: "#e2dacf",
          bone: "#b8ae9c",
          ash: "#70695d",
          rune: "#d4a373"
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Trajan Pro', 'Georgia', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        'souls': '0.25em',
        'souls-wide': '0.4em',
        'souls-mega': '0.6em',
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(197, 160, 89, 0.25)',
        'gold-glow-lg': '0 0 45px -5px rgba(197, 160, 89, 0.4)',
        'death-glow': '0 0 50px -5px rgba(138, 22, 22, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'death-slam': 'deathSlam 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        deathSlam: {
          '0%': { opacity: '0', transform: 'scale(1.15)' },
          '35%': { opacity: '1', transform: 'scale(1.02)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
