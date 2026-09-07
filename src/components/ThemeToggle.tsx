'use client';

import { useSyncExternalStore } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { readTheme, serverTheme, subscribeToTheme, toggleTheme } from '@/lib/theme-transition';

/**
 * Switches between the dark and light palettes, revealing the new theme as a
 * circle expanding from this button.
 *
 * The icons ride opposite ends of a wheel (see `.theme-orbit` in globals.scss)
 * whose top alone shows through the window, so one sets on the right as the
 * other rises on the left. Which one is up follows `data-theme` on <html>, so
 * it is right before hydration; the subscription below only keeps the control's
 * accessible state in step with the attribute.
 */
const ThemeToggle = (): React.JSX.Element => {
  const theme = useSyncExternalStore(subscribeToTheme, readTheme, serverTheme);
  const isLight = theme === 'light';

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Capture the origin before the flip; the header restyles as the theme changes.
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();

    void toggleTheme({ x: left + width / 2, y: top + height / 2 });
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-full border border-border-main hover:bg-background-paper/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-main/50"
      aria-label={isLight ? 'Switch to the dark theme' : 'Switch to the light theme'}
      aria-pressed={isLight}
    >
      <span className="theme-orbit-window block" style={{ viewTransitionName: 'theme-toggle' }}>
        <span className="theme-orbit">
          <FiMoon className="theme-icon theme-icon--moon" size={20} aria-hidden />
          <FiSun className="theme-icon theme-icon--sun" size={20} aria-hidden />
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;
