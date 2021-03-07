/* eslint-disable @typescript-eslint/no-var-requires */

const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    content: ['./src/**/*.{jsx,tsx}'],
  },
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ubuntu', ...fontFamily.sans],
      },
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        tertiary: 'var(--color-bg-tertiary)',
        orange: '#FB923C',
      },
      textColor: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
      },
      borderColor: {
        primary: 'var(--color-border-primary)',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(0.5rem)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        'slide-up': 'slide-up 250ms cubic-bezier(0.4, 0, 0.6, 1)',
      },
      zIndex: {
        '-10': '-10',
        '-20': '-20',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
  },
  plugins: [],
};
