import type { Config } from 'tailwindcss';
import { varColors, breakpoints } from './src/lib/theme';

// Colours resolve through CSS variables so `data-theme` on <html> swaps them.
// See src/lib/theme.ts for the palettes themselves.
const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: varColors.primary,

        // Background colors
        background: varColors.background,

        // Accent colors (blue, deepened for contrast in the light theme)
        accent: varColors.accent,

        // Neutral colors
        neutral: varColors.neutral,

        // Social media colors
        social: varColors.social,

        // Search input colors
        input: varColors.input,

        // Text colors (flattened)
        'text-primary': varColors.text.primary,
        'text-secondary': varColors.text.secondary,
        'text-disabled': varColors.text.disabled,
        'text-accent': varColors.text.accent,
        'text-heading': varColors.text.heading,
        'text-body': varColors.text.body,

        // Border colors (flattened)
        'border-light': varColors.border.light,
        'border-main': varColors.border.main
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
        // Drive `prose` off the same variables instead of `prose-invert`, so
        // long-form content follows the active theme.
        DEFAULT: {
          css: {
            // Matches what `prose-invert` produced in the dark theme
            '--tw-prose-body': 'rgb(var(--c-text-secondary))',
            '--tw-prose-headings': 'rgb(var(--c-text-primary))',
            '--tw-prose-lead': 'rgb(var(--c-text-secondary))',
            '--tw-prose-links': 'rgb(var(--c-primary-main))',
            '--tw-prose-bold': 'rgb(var(--c-text-primary))',
            '--tw-prose-counters': 'rgb(var(--c-text-disabled))',
            '--tw-prose-bullets': 'rgb(var(--c-text-disabled))',
            '--tw-prose-hr': 'rgb(var(--c-border-light))',
            '--tw-prose-quotes': 'rgb(var(--c-text-primary))',
            '--tw-prose-quote-borders': 'rgb(var(--c-border-light))',
            '--tw-prose-captions': 'rgb(var(--c-text-disabled))',
            '--tw-prose-code': 'rgb(var(--c-text-primary))',
            '--tw-prose-pre-code': 'rgb(var(--c-text-secondary))',
            '--tw-prose-pre-bg': 'rgb(var(--c-bg-paper))',
            '--tw-prose-th-borders': 'rgb(var(--c-border-main))',
            '--tw-prose-td-borders': 'rgb(var(--c-border-light))',
            a: {
              '&:hover': {
                color: 'rgb(var(--c-primary-light))'
              }
            }
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;
