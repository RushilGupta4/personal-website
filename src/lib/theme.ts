/**
 * Theme constants for the application
 * -----------------------------------
 * Two palettes with an identical shape:
 *   - `darkColors` — the site's default look
 *   - `lightColors` — the same design on a light ground
 *
 * Both keep the brand colour: blue accents, the red on the email link, and the
 * muted blog tags. Only the grounds, type and borders invert; the accents are
 * re-tuned for contrast rather than drained.
 *
 * `colors` aliases `darkColors` for consumers that need literal hex at render
 * time (OG image generation, which is always drawn in the dark palette).
 *
 * Tailwind consumes `varColors`, which points every token at a CSS custom
 * property, so flipping `data-theme` on <html> repaints the whole site.
 */

type Shades<K extends string> = Record<K, string>;

export interface Palette {
  primary: Shades<'main' | 'light' | 'dark'>;
  background: Shades<'dark' | 'light' | 'paper'>;
  text: Shades<'primary' | 'secondary' | 'disabled' | 'accent' | 'heading' | 'body'>;
  accent: Shades<'300' | '400' | '500' | '600'>;
  neutral: Shades<'main'>;
  border: Shades<'light' | 'main'>;
  social: Shades<'github' | 'linkedin' | 'email'>;
  input: Shades<'bg' | 'text' | 'border'>;
}

export const darkColors: Palette = {
  primary: {
    main: '#1473d2',
    light: '#2682e0',
    dark: '#1062b5'
  },

  background: {
    dark: '#000000',
    light: '#19191c',
    paper: '#1c1c1c'
  },

  text: {
    primary: '#f7f8fb',
    secondary: '#d1d5db',
    disabled: '#6b7280',
    accent: '#1656bc',
    heading: '#e2e8f0',
    body: '#cbd5e1'
  },

  // Blue accents, mirroring the Tailwind blue shades they replaced
  accent: {
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb'
  },

  neutral: {
    main: '#64748b'
  },

  border: {
    light: '#374151',
    main: '#4b5563'
  },

  social: {
    github: '#1c2128',
    linkedin: '#0a66c2',
    email: '#d53833'
  },

  // A quiet surface keeps the search field secondary to the content
  input: {
    bg: '#222226',
    text: '#f7f8fb',
    border: '#45454d'
  }
};

export const lightColors: Palette = {
  // Same blue, with the hover shade going darker instead of lighter
  primary: {
    main: '#1473d2',
    light: '#2682e0',
    dark: '#0c58a6'
  },

  background: {
    dark: '#ffffff',
    light: '#fafafa',
    paper: '#f2f2f3'
  },

  text: {
    primary: '#0a0a0a',
    secondary: '#3f3f46',
    disabled: '#71717a',
    accent: '#1656bc',
    heading: '#18181b',
    body: '#3f3f46'
  },

  // Deeper blues, since the dark theme's shades are washed out on white
  accent: {
    300: '#1e40af',
    400: '#2563eb',
    500: '#2563eb',
    600: '#1d4ed8'
  },

  neutral: {
    main: '#64748b'
  },

  border: {
    light: '#d4d4d8',
    main: '#a1a1aa'
  },

  // Brand colours, unchanged
  social: {
    github: '#1c2128',
    linkedin: '#0a66c2',
    email: '#d53833'
  },

  input: {
    bg: '#ffffff',
    text: '#0a0a0a',
    border: '#d4d4d8'
  }
};

// Literal hex for render-time consumers (OG images)
export const colors = darkColors;

export const THEMES = ['dark', 'light'] as const;
export type ThemeName = (typeof THEMES)[number];

export const palettes: Record<ThemeName, Palette> = {
  dark: darkColors,
  light: lightColors
};

export const DEFAULT_THEME: ThemeName = 'dark';
export const THEME_STORAGE_KEY = 'theme';
export const THEME_ATTRIBUTE = 'data-theme';

// `background` reads better as `bg-*` in Tailwind class names
const GROUP_ALIASES: Record<string, string> = { background: 'bg' };

const varName = (group: string, shade: string): string => `--c-${GROUP_ALIASES[group] ?? group}-${shade}`;

const hexToChannels = (hex: string): string => {
  const raw = hex.replace('#', '');
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map(c => c + c)
          .join('')
      : raw;
  return [0, 2, 4].map(i => parseInt(full.slice(i, i + 2), 16)).join(' ');
};

const asGroups = (palette: Palette): Record<string, Record<string, string>> => palette as unknown as Record<string, Record<string, string>>;

/**
 * Every token as `rgb(var(--c-*) / <alpha-value>)` so Tailwind's opacity
 * modifiers (`bg-primary-main/15`) keep working across both themes.
 */
export const varColors = Object.fromEntries(
  Object.entries(asGroups(darkColors)).map(([group, shades]) => [
    group,
    Object.fromEntries(Object.keys(shades).map(shade => [shade, `rgb(var(${varName(group, shade)}) / <alpha-value>)`]))
  ])
) as { [G in keyof Palette]: Record<keyof Palette[G], string> };

const declarationsFor = (palette: Palette): string =>
  Object.entries(asGroups(palette))
    .flatMap(([group, shades]) => Object.entries(shades).map(([shade, hex]) => `${varName(group, shade)}:${hexToChannels(hex)}`))
    .join(';');

/**
 * The custom properties both themes resolve against, emitted once into <head>
 * so this file stays the single source of truth for colour.
 */
export const themeVarsCss = [
  `:root{color-scheme:dark;${declarationsFor(darkColors)}}`,
  `:root[${THEME_ATTRIBUTE}='light']{color-scheme:light;${declarationsFor(lightColors)}}`
].join('');

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
