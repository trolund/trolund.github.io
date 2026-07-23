import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cardClass =
  'rounded-[28px] border border-border-color bg-[var(--bg)] shadow-custom transition-[transform,translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-custom-low';
