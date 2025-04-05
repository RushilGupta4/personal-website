/**
 * Theme constants for the application
 * These values are used to configure Tailwind and in component styling
 */

// Color palette - matches Tailwind config
export const colors = {
  // Primary colors
  primary: {
    main: '#0a66c2',
    light: '#1a76d2',
    dark: '#0956a2'
  },

  // Background colors
  background: {
    dark: '#000000',
    light: '#19191c',
    paper: '#1c1c1c'
  },

  // Text colors
  text: {
    primary: '#f7f8fb',
    secondary: '#d1d5db',
    disabled: '#6b7280',
    accent: '#1656bc'
  },

  // Social media colors
  social: {
    github: '#1C2128',
    linkedin: '#0a66c2',
    email: '#d53833'
  },

  // Border colors
  border: {
    light: '#374151',
    main: '#4b5563'
  }
};

// Spacing values (in px) - aligned with Tailwind defaults
export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  '2xl': '3rem' // 48px
};

// Breakpoints - aligned with Tailwind config
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
  '4xl': '2560px'
};

// Font sizes - aligned with Tailwind defaults
export const fontSizes = {
  xs: '0.75rem', // 12px
  sm: '0.875rem', // 14px
  base: '1rem', // 16px
  lg: '1.125rem', // 18px
  xl: '1.25rem', // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem' // 48px
};

// Z-index values - for consistent layering
export const zIndex = {
  base: 1,
  navbar: 100,
  modal: 200,
  tooltip: 300
};

// Export the entire theme as a single object for easier imports
export const theme = {
  colors,
  spacing,
  breakpoints,
  fontSizes,
  zIndex
};
