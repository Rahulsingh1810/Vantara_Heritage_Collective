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
              <p className="text-xs text-(--color-wine-red)/60 uppercase">Category</p>
              <p>{category}</p>
            </div>
          )}

          <div>
            <p className="text-xs text-(--color-wine-red)/60 uppercase">Material</p>
            <p>{material}</p>
          </div>

          <div>
            <p className="text-xs text-(--color-wine-red)/60 uppercase">Dimensions</p>
            <p>{dimensions}</p>
          </div>

          <div>
            <p className="text-xs text-(--color-wine-red)/60 uppercase">Weight</p>
            <p>{weight}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-xs text-(--color-wine-red)/60 uppercase">Origin</p>
            <p>{origin}</p>
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
      content: (
        <>
          {stylingNotes && <p className="mb-4 text-sm">{stylingNotes}</p>}

          {inYourSpace && (
            <div className="rounded-xl bg-(--color-wine-red)/5 p-4 text-sm">
              <p className="mb-1 font-medium text-(--color-wine-red)">In Your Space</p>
              <p>{inYourSpace}</p>
            </div>
          )}
        </>
      )
    }
  ]

  const [active, setActive] = useState(0)

  return (
    <section className="mt-20">
      <h2 className="mb-12 text-center text-3xl font-bold text-(--color-wine-red)">Product Details</h2>

      {/* DESKTOP MASTER / SLAVE */}
      <div className="hidden gap-12 md:grid md:grid-cols-3">
        {/* MASTER */}
        <div className="space-y-4">
          {sections.map((s, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative w-full rounded-2xl border p-6 text-left transition ${
                active === i
                  ? 'bg-linear-to-br from-(--color-wine-red) to-[#5a0018] text-(--color-ivory) shadow-xl'
                  : 'border-(--color-wine-red)/20 bg-(--color-ivory) text-(--color-wine-red) hover:shadow-md'
              }`}
            >
              <span className="text-lg font-semibold">{s.title}</span>

              {active === i && (
                <motion.div
                  layoutId="active-dot"
                  className="absolute top-4 right-4 h-2 w-2 rounded-full bg-(--color-ivory)"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* SLAVE */}
        <div className="md:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-(--color-wine-red)/20 bg-(--color-ivory) p-12 shadow-xl"
            >
              <h3 className="mb-6 text-3xl font-bold text-(--color-wine-red)">{sections[active].title}</h3>

              <div className="text-(--color-wine-red)/75">{sections[active].content}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* MOBILE ACCORDION */}
      <div className="space-y-4 md:hidden">
        {sections.map((s, i) => {
          const open = active === i

          return (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-(--color-wine-red)/20 bg-[var(--color-ivory)]"
            >
              <button
                onClick={() => setActive(open ? -1 : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-semibold text-(--color-wine-red)">{s.title ?? ''}</span>

                <motion.div animate={{ rotate: open ? 180 : 0 }}>
                  <ChevronDown className="h-5 w-5 text-(--color-wine-red)" />
                </motion.div>
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm text-(--color-wine-red)/75">{s.content}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Heritage */}
      <div className="mt-12 rounded-2xl border border-(--color-wine-red)/20 bg-(--color-ivory) p-6 shadow-sm">
        <p className="font-semibold text-[var(--color-wine-red)]">🇮🇳 Authentic Indian Heritage</p>
        <p className="mt-2 text-sm text-[var(--color-wine-red)]/70">
          Each piece is thoughtfully sourced to honor and sustain traditional craftsmanship across India.
        </p>
      </div>
    </section>
  )
}
