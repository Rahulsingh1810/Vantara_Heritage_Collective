// Centralized promotional offer configuration
// 10% off all products — July 23 to August 5, 2026
// Minimum order value: ₹1000

/** Offer start date: July 23, 2026 00:00:00 IST */
const OFFER_START = new Date('2026-07-21T00:00:00+05:30')

/** Offer end date: August 5, 2026 23:59:59 IST */
const OFFER_END = new Date('2026-08-05T23:59:59+05:30')

/** Discount percentage */
export const DISCOUNT_PERCENT = 10

/** Minimum order value (in ₹) required to avail the discount */
export const MIN_ORDER_VALUE = 1000

/**
 * Check whether the promotional offer is currently active
 * based on the current date/time.
 */
export function isOfferActive(): boolean {
  const now = new Date()
  return now >= OFFER_START && now <= OFFER_END
}

/**
 * Calculate the discount amount for a given subtotal.
 * Returns 0 if the offer is not active or subtotal is below the minimum.
 */
export function getDiscount(subtotal: number): number {
  if (!isOfferActive()) return 0
  if (subtotal < MIN_ORDER_VALUE) return 0
  return Math.round(((subtotal * DISCOUNT_PERCENT) / 100) * 100) / 100
}

/**
 * Human-readable offer date range for display purposes.
 */
export const OFFER_DATE_RANGE = '23 Jul – 5 Aug 2026'
