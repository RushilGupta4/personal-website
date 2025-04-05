import type { Config } from 'tailwindcss';
import { colors, breakpoints } from './src/lib/theme';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: colors.primary,

        // Background colors
        background: colors.background,

        // Social media colors
        social: colors.social,

        // Text colors (flattened)
        'text-primary': colors.text.primary,
        'text-secondary': colors.text.secondary,
        'text-disabled': colors.text.disabled,
        'text-accent': colors.text.accent,

        // Border colors (flattened)
        'border-light': colors.border.light,
        'border-main': colors.border.main
      },
      screens: {
        '3xl': breakpoints['3xl'],
        '4xl': breakpoints['4xl']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      typography: {
        DEFAULT: {
          css: {
            color: colors.text.primary,
            a: {
              color: colors.primary.main,
              '&:hover': {
                color: colors.primary.light
              }
            },
            h1: { color: colors.text.primary },
            h2: { color: colors.text.primary },
            h3: { color: colors.text.primary },
            h4: { color: colors.text.primary }
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;
