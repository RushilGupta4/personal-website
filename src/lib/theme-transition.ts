/**
 * Theme switching, and the circular reveal that goes with it.
 *
 * The source of truth is the `data-theme` attribute on <html> (set before
 * first paint by the inline script in the root layout), mirrored into
 * localStorage. Nothing here needs React state.
 *
 * The reveal itself is a CSS animation declared in globals.scss; this file only
 * hands it the circle's geometry and keeps the main thread quiet while it runs.
 */

import { DEFAULT_THEME, THEMES, THEME_ATTRIBUTE, THEME_STORAGE_KEY, palettes, type ThemeName } from '@/lib/theme';

// Approximate r(t) = 0.9t + 0.1t²: a small constant acceleration, with
// edge speed rising smoothly from 90% to 110% of the average speed.
const REVEAL_DURATION = 300;
const REVEAL_EASING = 'cubic-bezier(0.333333, 0.3, 0.666667, 0.633333)';
const FADE_DURATION = 120;

const GEOMETRY_PROPS = ['--reveal-x', '--reveal-y', '--reveal-r', '--reveal-duration', '--reveal-easing'] as const;

export interface RevealOrigin {
  x: number;
  y: number;
}

const isTheme = (value: string | null): value is ThemeName => value !== null && (THEMES as readonly string[]).includes(value);

export const readTheme = (): ThemeName => {
  const current = document.documentElement.getAttribute(THEME_ATTRIBUTE);
  return isTheme(current) ? current : DEFAULT_THEME;
};

export const nextTheme = (current: ThemeName): ThemeName => (current === 'light' ? 'dark' : 'light');

/**
 * The attribute on <html> is the store; components read it through
 * `useSyncExternalStore` rather than keeping a copy of their own.
 */
const listeners = new Set<() => void>();

export const subscribeToTheme = (onChange: () => void): (() => void) => {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
};

export const serverTheme = (): ThemeName => DEFAULT_THEME;

const prefersReducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** The page background actually on screen: <html> is `bg-background-dark`, and `bg-background-light` from `sm` up. */
const pageBackground = (theme: ThemeName): string => {
  const { background } = palettes[theme];
  return window.matchMedia('(min-width: 640px)').matches ? background.light : background.dark;
};

const applyTheme = (theme: ThemeName): void => {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private browsing or blocked storage; the theme still applies for this page.
  }

  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', palettes[theme].background.dark);
};

/**
 * Deferred until the reveal is over. Waking React mid-transition puts a render
 * on the main thread exactly while the circle is being painted.
 */
const notifyThemeChange = (): void => listeners.forEach(listener => listener());

/** Distance from the origin to the furthest viewport corner. */
const revealRadius = ({ x, y }: RevealOrigin): number => Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

const setRevealGeometry = (origin: RevealOrigin, radius: number): void => {
  const { style } = document.documentElement;
  style.setProperty('--reveal-x', `${origin.x}px`);
  style.setProperty('--reveal-y', `${origin.y}px`);
  style.setProperty('--reveal-r', `${radius}px`);
  style.setProperty('--reveal-duration', `${REVEAL_DURATION}ms`);
  style.setProperty('--reveal-easing', REVEAL_EASING);
};

const clearRevealGeometry = (): void => {
  const { style } = document.documentElement;
  GEOMETRY_PROPS.forEach(prop => style.removeProperty(prop));
};

/**
 * The `theme-reveal` keyframes clip the *incoming* snapshot to a growing
 * circle. Because it is always the new theme being revealed, one animation
 * covers both directions: white grows on the way to light, and the dark
 * palette grows on the way back.
 */
const revealWithViewTransition = async (theme: ThemeName, origin: RevealOrigin): Promise<void> => {
  setRevealGeometry(origin, revealRadius(origin));

  // Capture settled icons. Otherwise the incoming snapshot can contain the
  // outgoing glyph while its live CSS transition is still at the first frame.
  document.documentElement.setAttribute('data-theme-revealing', '');

  try {
    const transition = document.startViewTransition(() => applyTheme(theme));
    await transition.finished;
  } catch {
    // Transition was skipped; the theme is applied regardless.
  } finally {
    document.documentElement.removeAttribute('data-theme-revealing');
    clearRevealGeometry();
  }
};

/**
 * Fallback for browsers without the View Transitions API: grow a circle of the
 * incoming background colour, swap the theme underneath it, then fade it away.
 * Scaling a round element is compositor-driven, so this stays smooth even
 * though the page itself cannot be snapshotted.
 */
const revealWithOverlay = async (theme: ThemeName, origin: RevealOrigin): Promise<void> => {
  const radius = revealRadius(origin);
  const overlay = document.createElement('div');

  overlay.className = 'theme-reveal';
  overlay.style.backgroundColor = pageBackground(theme);
  overlay.style.left = `${origin.x - radius}px`;
  overlay.style.top = `${origin.y - radius}px`;
  overlay.style.width = `${radius * 2}px`;
  overlay.style.height = `${radius * 2}px`;
  document.body.appendChild(overlay);

  try {
    await overlay.animate({ transform: ['scale(0)', 'scale(1)'] }, { duration: REVEAL_DURATION, easing: REVEAL_EASING, fill: 'forwards' }).finished;

    applyTheme(theme);

    await overlay.animate({ opacity: [1, 0] }, { duration: FADE_DURATION, easing: 'linear', fill: 'forwards' }).finished;
  } finally {
    overlay.remove();
  }
};

let inFlight = false;

/** Flip the theme, revealing the new one as a circle expanding from `origin`. */
export const toggleTheme = async (origin: RevealOrigin): Promise<void> => {
  if (inFlight) return;

  const theme = nextTheme(readTheme());

  if (prefersReducedMotion()) {
    applyTheme(theme);
    notifyThemeChange();
    return;
  }

  inFlight = true;

  try {
    if (typeof document.startViewTransition === 'function') {
      await revealWithViewTransition(theme, origin);
    } else {
      await revealWithOverlay(theme, origin);
    }
  } finally {
    inFlight = false;
    notifyThemeChange();
  }
};
