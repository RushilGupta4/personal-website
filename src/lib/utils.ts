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
