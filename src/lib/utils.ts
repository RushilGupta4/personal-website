import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility Functions
 * -----------------
 * This file contains reusable utility functions for the application
 */

/**
 * Merges Tailwind CSS classes and custom classes using clsx and tailwind-merge
 *
 * @param inputs - Array of class values to be merged
 * @returns A string of merged and deduplicated CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string to a more readable format (Month Day, Year)
 *
 * @param date - ISO date string to format
 * @returns Formatted date string (e.g., "January 1, 2023")
 */
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Truncates text to a specified length and adds ellipsis if needed
 *
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Creates a URL-friendly slug from a string
 *
 * @param text - The text to convert to a slug
 * @returns URL-friendly slug string
 */
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Formats a blog frontmatter date as "05 Dec 2023", matching the blog post header.
 *
 * @param date - Date string as written in frontmatter, e.g. "December 5, 2023"
 * @returns Formatted date, or the input unchanged if it cannot be parsed
 */
export const formatShortDate = (date: string): string => {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return `${String(parsed.getDate()).padStart(2, '0')} ${MONTHS_SHORT[parsed.getMonth()]} ${parsed.getFullYear()}`;
};

/**
 * Machine-readable YYYY-MM-DD for a <time> element. Uses local date parts so a
 * date-only frontmatter value cannot drift into the previous day via UTC.
 *
 * @param date - Date string as written in frontmatter
 * @returns ISO calendar date, or an empty string if it cannot be parsed
 */
export const toISODate = (date: string): string => {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return '';
  return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`;
};
