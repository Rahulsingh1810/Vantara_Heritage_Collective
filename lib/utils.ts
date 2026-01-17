import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ensureNumber(value: any): number {
  if (typeof value === "number") return value
  if (typeof value === "string") return Number.parseFloat(value)
  return 0
}
