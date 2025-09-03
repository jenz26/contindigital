import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP';
    notation?: Intl.NumberFormatOptions['notation'];
  } = {}
) {
  const { currency = 'EUR', notation = 'standard' } = options;

  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency,
    notation,
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {}
) {
  return new Intl.DateTimeFormat('it-IT', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    ...options,
  }).format(new Date(date));
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

export function generateMetaDescription(
  content: string,
  maxLength: number = 160
): string {
  if (content.length <= maxLength) return content;
  
  const truncated = content.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
}