'use client';

import NavLink from '@/components/NavLink';
import ThemeToggle from '@/components/ThemeToggle';
import { NAVIGATION_ROUTES } from '@/lib/constants';
import { useState, useEffect } from 'react';

const Navbar = (): React.JSX.Element => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'site-header--scrolled py-2 md:py-3 backdrop-blur-lg bg-background-light/80' : 'py-3 md:py-5 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-2 sm:px-4 lg:px-8">
        {/* One centred row at every width - the links shrink rather than collapsing into a menu.
            The spacer mirrors the toggle so the links stay centred on the page. */}
        <div className="flex items-center">
          <span className="w-9 shrink-0" aria-hidden />

          <nav className="flex-1">
            <ul className="flex items-center justify-center gap-0.5 sm:gap-2">
              {NAVIGATION_ROUTES.map(route => (
                <li key={route.name}>
                  <NavLink
                    to={route.path}
                    exact={route.exact}
                    className="block px-2 py-1.5 sm:px-4 sm:py-2 relative overflow-hidden rounded-md whitespace-nowrap text-sm sm:text-base text-text-secondary hover:text-text-primary transition-all duration-300 group"
                    activeClassName="font-medium text-text-primary"
                  >
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-main to-accent-400 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                    {route.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="w-9 shrink-0 flex justify-end">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
