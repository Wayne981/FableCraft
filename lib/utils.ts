// Utility functions for the app
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Combines tailwind classes with proper precedence
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format price to currency
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

// Format date to readable string
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

