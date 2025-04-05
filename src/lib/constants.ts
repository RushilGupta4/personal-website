/**
 * Application Constants
 * --------------------
 * This file contains global constants used throughout the application
 */

// Site URLs
export const baseUrl = 'https://rushilgupta.in';

// Social media links
export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/rushilgupta4',
  github: 'https://github.com/RushilGupta4',
  email: 'mailto:rushilgupta4@gmail.com'
};

// Navigation routes interface
export interface NavRoute {
  name: string; // Display name for the route
  path: string; // URL path
  exact?: boolean; // Whether to match the path exactly
}

// Main navigation routes
export const NAVIGATION_ROUTES: NavRoute[] = [
  { name: 'Home', path: '/', exact: true },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Projects', path: '/projects' }
];
