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

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** Parse supported calendar dates without depending on the server timezone. */
export const toISODate = (date: string): string => {
  if (typeof date !== 'string') return '';
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const legacy = /^([A-Za-z]+) (\d{1,2}), (\d{4})$/.exec(date);
  if (!iso && !legacy) return '';
  const year = Number(iso ? iso[1] : legacy![3]);
  const month = iso ? Number(iso[2]) : MONTHS.indexOf(legacy![1]) + 1;
  const day = Number(iso ? iso[3] : legacy![2]);
  const parsed = new Date(0);
  parsed.setUTCFullYear(year, month - 1, day);
  if (month < 1 || month > 12 || day < 1 || parsed.getUTCFullYear() !== year || parsed.getUTCMonth() !== month - 1 || parsed.getUTCDate() !== day) return '';
  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

export const formatShortDate = (date: string): string => {
  const iso = toISODate(date);
  if (!iso) return date;
  const [year, month, day] = iso.split('-');
  return `${day} ${MONTHS[Number(month) - 1].slice(0, 3)} ${year}`;
};
