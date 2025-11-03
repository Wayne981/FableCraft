// Utility functions for the app
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Combines tailwind classes with proper precedence
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format price to currency
export function formatPrice(price: number): string {
  const USD_TO_INR = 88.2; // Current exchange rate (update as needed)
  const priceInINR = price * USD_TO_INR;
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0, // No decimals for INR
  }).format(priceInINR)
}

// Format date to readable string
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

