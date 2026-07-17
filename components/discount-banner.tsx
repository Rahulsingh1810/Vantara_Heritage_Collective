'use client'

import { isOfferActive, OFFER_DATE_RANGE, DISCOUNT_PERCENT, MIN_ORDER_VALUE } from '@/lib/offer-config'

export default function DiscountBanner() {
  if (!isOfferActive()) return null

  const message = `🎉 ${DISCOUNT_PERCENT}% OFF on all products! | Valid ${OFFER_DATE_RANGE} | FREE Sticker with every order! 🎉`

  return (
    <div className="overflow-hidden bg-[var(--color-ivory)] text-[var(--color-wine-red)]">
      <div className="animate-marquee flex py-2 whitespace-nowrap">
        {/* Duplicate the text 4 times for seamless infinite scrolling */}
        {[0, 1, 2, 3].map(i => (
          <span key={i} className="mx-8 inline-block text-sm font-bold">
            {message}
          </span>
        ))}
      </div>
    </div>
  )
}
