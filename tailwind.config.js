/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          400: '#F87171',
          500: '#E63946',
          600: '#E63946',
          700: '#DC2F3C',
          900: '#7F1D1D',
          DEFAULT: '#E63946',
        },
        secondary: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          500: '#F4A261',
          600: '#F4A261',
          700: '#D97706',
          DEFAULT: '#F4A261',
        },
        success: {
          DEFAULT: '#2A9D8F',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          elevated: '#F8F9FA',
        },
      },
      fontFamily: {
        sans:    ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['"DM Sans"', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        none:  '0px',
        DEFAULT: '0px',
        sm:    '0px',
        md:    '0px',
        lg:    '0px',
        xl:    '0px',
        '2xl': '0px',
        '3xl': '0px',
        full:  '9999px',
      },
      boxShadow: {
        'sm':          '4px 4px 0px rgba(15, 23, 42, 0.08)',
        'md':          '6px 6px 0px rgba(15, 23, 42, 0.12)',
        'lg':          '8px 8px 0px rgba(15, 23, 42, 0.15)',
        'xl':          '12px 12px 0px rgba(15, 23, 42, 0.18)',
        'primary-sm':  '4px 4px 0px rgba(230, 57, 70, 0.15)',
        'primary-md':  '6px 6px 0px rgba(230, 57, 70, 0.20)',
        'primary-lg':  '8px 8px 0px rgba(230, 57, 70, 0.25)',
        'card':        '4px 4px 0px rgba(15, 23, 42, 0.08)',
        'card-hover':  '6px 6px 0px rgba(230, 57, 70, 0.20)',
        'none':        'none',
      },
      animation: {
        'fade-in':        'fadeIn 0.6s ease-out forwards',
        'slide-up':       'slideUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
        'scale-in':       'scaleIn 0.4s ease-out forwards',
        'spin-slow':      'spin 8s linear infinite',
        'pulse-slow':     'pulse 3s ease-in-out infinite',
        'bounce-slow':    'bounce 2s infinite',
      },
      keyframes: {
        fadeIn:       { '0%': { opacity: '0' },                               '100%': { opacity: '1' } },
        slideUp:      { '0%': { opacity: '0', transform: 'translateY(24px)' },'100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(24px)' },'100%': { opacity: '1', transform: 'translateX(0)' } },
        scaleIn:      { '0%': { opacity: '0', transform: 'scale(0.9)' },      '100%': { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
}
