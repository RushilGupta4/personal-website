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

// Expand the desktop circle at a constant radial speed.
const REVEAL_DURATION = 300;
const REVEAL_EASING = 'linear';
const FADE_DURATION = 120;
const MOBILE_REVEAL_DURATION = 250;
const MOBILE_REVEAL_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

const GEOMETRY_PROPS = ['--reveal-x', '--reveal-y', '--reveal-r', '--reveal-duration', '--reveal-easing'] as const;

export interface RevealOrigin {
  x: number;
  y: number;
}

interface RevealSettings {
  origin: RevealOrigin;
  duration: number;
  easing: string;
  crossfade: boolean;
}

/** Mobile fades the whole page; desktop retains its toggle-centered circle. */
const revealSettings = (origin: RevealOrigin): RevealSettings => {
  const crossfade = window.matchMedia('(max-width: 767px)').matches;
  return {
    origin,
    duration: crossfade ? MOBILE_REVEAL_DURATION : REVEAL_DURATION,
    easing: crossfade ? MOBILE_REVEAL_EASING : REVEAL_EASING,
    crossfade
  };
};

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

const setRevealGeometry = ({ origin, duration, easing }: RevealSettings, radius: number): void => {
  const { style } = document.documentElement;
  const { innerWidth: width, innerHeight: height } = window;
  // Keep snapshot geometry relative to its reference box, avoiding pixel scaling
  // discrepancies. CSS circle percentages use the normalized diagonal.
  const normalizedDiagonal = Math.hypot(width, height) / Math.SQRT2;
  style.setProperty('--reveal-x', `${(origin.x / width) * 100}%`);
  style.setProperty('--reveal-y', `${(origin.y / height) * 100}%`);
  style.setProperty('--reveal-r', `${((radius * 1.02) / normalizedDiagonal) * 100}%`);
  style.setProperty('--reveal-duration', `${duration}ms`);
  style.setProperty('--reveal-easing', easing);
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
const revealWithViewTransition = async (theme: ThemeName, settings: RevealSettings): Promise<void> => {
  if (settings.crossfade) {
    document.documentElement.setAttribute('data-theme-crossfade', '');
  } else {
    setRevealGeometry(settings, revealRadius(settings.origin));
  }

  // Capture settled icons. Otherwise the incoming snapshot can contain the
  // outgoing glyph while its live CSS transition is still at the first frame.
  document.documentElement.setAttribute('data-theme-revealing', '');

  try {
    const transition = document.startViewTransition(() => applyTheme(theme));
    await transition.finished;
  } catch {
    // Even if snapshot creation fails, the requested theme still applies.
    applyTheme(theme);
  } finally {
    document.documentElement.removeAttribute('data-theme-revealing');
    document.documentElement.removeAttribute('data-theme-crossfade');
    clearRevealGeometry();
  }
};

/**
 * Fallback for browsers without the View Transitions API: grow a circle of the
 * incoming background colour, swap the theme underneath it, then fade it away.
 * Scaling a round element is compositor-driven, so this stays smooth even
 * though the page itself cannot be snapshotted.
 */
const revealWithOverlay = async (theme: ThemeName, { origin, duration, easing }: RevealSettings): Promise<void> => {
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
    await overlay.animate({ transform: ['scale(0)', 'scale(1)'] }, { duration, easing, fill: 'forwards' }).finished;

    applyTheme(theme);

    await overlay.animate({ opacity: [1, 0] }, { duration: FADE_DURATION, easing: 'linear', fill: 'forwards' }).finished;
  } catch {
    applyTheme(theme);
  } finally {
    overlay.remove();
  }
};

/** Without snapshots, interpolate palette colors while keeping content visible. */
const fadeWithoutViewTransition = async (theme: ThemeName): Promise<void> => {
  const root = document.documentElement;
  root.setAttribute('data-theme-fading', '');
  try {
    // Flush the transition rules before changing the palette.
    void root.offsetHeight;
    applyTheme(theme);
    await new Promise<void>(resolve => window.setTimeout(resolve, MOBILE_REVEAL_DURATION));
  } finally {
    root.removeAttribute('data-theme-fading');
  }
};

let inFlight = false;

/** Reveal from the toggle on desktop, or crossfade the page on mobile. */
export const toggleTheme = async (origin: RevealOrigin): Promise<void> => {
  if (inFlight) return;

  const theme = nextTheme(readTheme());

  if (prefersReducedMotion()) {
    applyTheme(theme);
    notifyThemeChange();
    return;
  }

  inFlight = true;
  const settings = revealSettings(origin);

  try {
    if (typeof document.startViewTransition === 'function') {
      await revealWithViewTransition(theme, settings);
    } else if (settings.crossfade) {
      await fadeWithoutViewTransition(theme);
    } else {
      await revealWithOverlay(theme, settings);
    }
  } finally {
    inFlight = false;
    notifyThemeChange();
  }
};
