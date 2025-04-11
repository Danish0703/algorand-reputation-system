import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format wallet address for display (ALGO...X3PO)
export function formatWalletAddress(address: string | null): string {
  if (!address) return "";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

// Format date to readable format
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Determine transaction icon based on type
export function getTransactionIcon(type: string): string {
  const lcType = type.toLowerCase();
  
  if (lcType.includes('liquidity') || lcType.includes('swap')) {
    return 'swap';
  }
  
  if (lcType.includes('dao') || lcType.includes('vote') || lcType.includes('govern')) {
    return 'users';
  }
  
  if (lcType.includes('nft') || lcType.includes('collect') || lcType.includes('art')) {
    return 'image';
  }
  
  if (lcType.includes('stake') || lcType.includes('yield')) {
    return 'trending-up';
  }
  
  return 'refresh-cw'; // default icon
}

// Calculate years and months from months value
export function formatLongevity(months: number): string {
  if (months < 12) {
    return `${months} mo`;
  }
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (remainingMonths === 0) {
    return `${years} yr`;
  }
  
  return `${years}.${Math.floor(remainingMonths / 1.2)} yrs`;
}

// Create random transaction ID for demo purposes
export function createTransactionId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  
  // First part (before ellipsis)
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  result += '...';
  
  // Second part (after ellipsis)
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}
