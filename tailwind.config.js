/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        srfv: {
          primary: '#f12421',
          'primary-hover': '#ff5a58',
          'primary-glow': 'rgba(241, 36, 33, 0.25)',
          accent: '#ff6b6b',
          'bg-dark': '#1e1f23',
          'bg-darker': '#16171b',
          'bg-darkest': '#0d0e12',
          'bg-card': 'rgba(30, 31, 35, 0.6)',
          border: 'rgba(255,255,255,0.08)',
          'border-light': 'rgba(255,255,255,0.12)',
          text: '#fff',
          'text-secondary': '#b0b3c0',
          'text-muted': '#7a7f92',
          'text-dim': '#4e5264',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        srfv: '20px',
        'srfv-sm': '14px',
        'srfv-xs': '10px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(241, 36, 33, 0.3)',
        'glow-sm': '0 0 10px rgba(241, 36, 33, 0.2)',
        card: '0 4px 30px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.5)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.2)',
      },
      backdropBlur: {
        glass: '16px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(241, 36, 33, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(241, 36, 33, 0.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'gradient-shift': 'gradient-shift 6s ease infinite',
      },
    },
  },
  plugins: [],
};
