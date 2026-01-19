import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge
 * This allows for conditional classes and prevents Tailwind conflicts
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format a price to display with currency
 */
export function formatPrice(price, currency = "CAD") {
  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency,
  }).format(price);
}

/**
 * Delay utility for animations
 */
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate staggered animation delays
 */
export function staggerDelay(index, baseDelay = 0.1) {
  return index * baseDelay;
}
