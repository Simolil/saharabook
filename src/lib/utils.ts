import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = 'EUR', locale: string = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export function formatDate(date: Date, locale: string = 'en-US') {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}
