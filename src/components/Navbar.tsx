'use client';

import NavLink from '@/components/NavLink';
import { NAVIGATION_ROUTES } from '@/lib/constants';
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';

const Navbar = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 backdrop-blur-lg bg-background-dark/80 shadow-md' : 'py-5 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between md:justify-center">
          {/* Logo */}
          <Link href="/" className="md:hidden relative group font-bold text-xl md:text-2xl">
            <span className="absolute -inset-x-2 -inset-y-1 rounded-lg group-hover:bg-primary-main/10 transition-all duration-300 -z-10"></span>
            <span className="bg-gradient-to-r from-text-primary via-blue-400 to-primary-light bg-clip-text text-transparent">Rushil Gupta</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-2">
              {NAVIGATION_ROUTES.map(route => (
                <li key={route.name}>
                  <NavLink
                    to={route.path}
                    exact={route.exact}
                    className="px-4 py-2 relative overflow-hidden rounded-md text-text-secondary hover:text-text-primary transition-all duration-300 group"
                    activeClassName="font-medium text-text-primary"
                  >
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-main to-blue-400 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                    {route.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-background-paper/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-main/50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 p-4 rounded-lg bg-background-paper/90 backdrop-blur-md animate-fade-in border border-border-light/20">
            <ul className="flex flex-col space-y-2">
              {NAVIGATION_ROUTES.map(route => (
                <li key={route.name}>
                  <NavLink
                    to={route.path}
                    exact={route.exact}
                    className="block px-4 py-3 rounded-md text-text-secondary hover:text-text-primary hover:bg-primary-main/10 transition-all duration-200"
                    activeClassName="font-medium text-text-primary bg-primary-main/20"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {route.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
