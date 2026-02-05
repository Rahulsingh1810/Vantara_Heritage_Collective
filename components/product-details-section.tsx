'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface ProductDetailsSectionProps {
  category?: string
  material?: string
  dimensions?: string
  weight?: string | number
  origin?: string
  stylingNotes?: string
  inYourSpace?: string
}

export default function ProductDetailsSection({
  category,
  material = 'Handcrafted with traditional techniques',
  dimensions = 'Varies by piece (please refer to images)',
  weight = 'Varies',
  origin = 'India',
  stylingNotes,
  inYourSpace
}: ProductDetailsSectionProps) {
  const sections = [
    {
      title: 'Product Specifications',
      content: (
        <div className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2">
          {category && (
            <div>
              <p className="text-xs tracking-wider text-(--color-wine-red)/60 uppercase">Category</p>
              <p className="font-medium">{category}</p>
            </div>
          )}

          <div>
            <p className="text-xs tracking-wider text-(--color-wine-red)/60 uppercase">Material</p>
            <p className="font-medium">{material}</p>
          </div>

          <div>
            <p className="text-xs tracking-wider text-(--color-wine-red)/60 uppercase">Dimensions</p>
            <p className="font-medium">{dimensions}</p>
          </div>
        </div>
      )
    },
    {
      title: 'Care & Longevity',
      content: (
        <ul className="space-y-3 text-sm">
          <li>✓ Avoid direct sunlight & humidity</li>
          <li>✓ Store in dry environments</li>
          <li>✓ Clean gently with soft tools</li>
        </ul>
      )
    },
    {
      title: 'Styling & Placement',
      content: stylingNotes ? <p className="text-sm">{stylingNotes}</p> : null
    },

    ...(inYourSpace
      ? [
          {
            title: 'In Your Space',
            content: <p className="text-sm leading-relaxed">{inYourSpace}</p>
          }
        ]
      : [])
  ]

  const [active, setActive] = useState<number | null>(0)

  return (
    <section className="mt-20 w-full">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-(--color-wine-red)">Product Details</h2>

      <div className="space-y-5">
        {sections.map((s, i) => {
          const open = active === i

          return (
            <motion.div
              key={i}
              layout
              className={`overflow-hidden rounded-2xl border transition-all ${
                open
                  ? 'border-(--color-wine-red) bg-linear-to-br from-(--color-ivory) to-(--color-wine-red)/5 shadow-xl'
                  : 'border-(--color-wine-red)/20 bg-(--color-ivory)'
              }`}
            >
              <button
                onClick={() => setActive(open ? null : i)}
                className="flex w-full items-center justify-between px-7 py-6 text-left"
              >
                <span className="text-lg font-bold tracking-wide text-(--color-wine-red)">{s.title}</span>

                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
                  <ChevronDown className="h-5 w-5 text-(--color-wine-red)" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open && s.content && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-7 pb-7 text-(--color-wine-red)/80">{s.content}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-14 rounded-2xl border border-(--color-wine-red)/20 bg-(--color-ivory) p-6 shadow-sm">
        <p className="font-bold text-(--color-wine-red)">🇮🇳 Authentic Indian Heritage</p>
        <p className="mt-2 text-sm text-(--color-wine-red)/70">
          Each piece is thoughtfully sourced to honor and sustain traditional craftsmanship across India.
        </p>
      </div>
    </section>
  )
}
