'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const tips = [
  {
    title: 'Balance Modern & Traditional',
    body: 'Mix heritage artifacts with contemporary furniture to create a harmonious blend that feels both timeless and current.',
    perfectFor: ['Living Rooms', 'Open Layout Homes'],
    rooms: ['Living Area', 'Dining Space'],
    checklist: [
      'Pair clean-lined sofas with handcrafted accents',
      'Use neutral furniture to highlight heritage colors',
      'Limit statement pieces to 2–3 per room'
    ]
  },
  {
    title: 'Create Focal Points',
    body: 'Use larger pieces like rugs, sculptures, or tapestries as focal points to anchor your room design.',
    perfectFor: ['Entryways', 'Feature Walls'],
    rooms: ['Hallway', 'Living Area'],
    checklist: [
      'Place focal items at eye level',
      'Avoid competing statement pieces',
      'Use lighting to highlight hero artifacts'
    ]
  },
  {
    title: 'Respect Color Palettes',
    body: 'Traditional artifacts often have rich, warm tones. Ensure they complement your existing color scheme.',
    perfectFor: ['Warm Interiors', 'Earthy Homes'],
    rooms: ['Bedroom', 'Living Room'],
    checklist: [
      'Repeat artifact colors in cushions or throws',
      'Avoid overly bright modern shades',
      'Stick to 2–3 dominant tones'
    ]
  },
  {
    title: 'Tell a Story',
    body: 'Each piece has history. Display artifacts in ways that highlight craftsmanship and cultural significance.',
    perfectFor: ['Collectors', 'Art Lovers'],
    rooms: ['Study', 'Gallery Walls'],
    checklist: ['Group items by theme or origin', 'Add small description cards', 'Use shelves to narrate a journey']
  },
  {
    title: 'Layer Your Decor',
    body: 'Combine different sizes and textures to add depth and visual interest to your space.',
    perfectFor: ['Minimal Homes', 'Large Rooms'],
    rooms: ['Living Area', 'Bedrooms'],
    checklist: ['Mix heights and materials', 'Add soft textiles for warmth', 'Avoid flat, single-level layouts']
  },
  {
    title: 'Light It Well',
    body: 'Good lighting enhances details and creates atmosphere around heritage pieces.',
    perfectFor: ['Display Areas', 'Evening Spaces'],
    rooms: ['Entryways', 'Corners'],
    checklist: ['Use warm spotlights', 'Avoid harsh overhead lighting', 'Add lamps for mood layering']
  }
]

export function DesignTipsMasterDetail() {
  const [active, setActive] = useState(0)

  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-14 text-center text-3xl font-bold text-(--color-wine-red)">
          Design Tips for Heritage Pieces
        </h2>

        {/* DESKTOP MASTER DETAIL */}
        <div className="hidden gap-12 md:grid md:grid-cols-3">
          {/* MASTER */}
          <div className="space-y-4">
            {tips.map((tip, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative w-full rounded-2xl border p-6 text-left transition-all ${
                  active === i
                    ? 'bg-linear-to-br from-(--color-wine-red) to-[#5a0018] text-(--color-ivory) shadow-xl'
                    : 'border-(--color-wine-red)/20 bg-(--color-ivory) text-(--color-wine-red) hover:shadow-md'
                }`}
              >
                <span className="block text-lg font-semibold">
                  {i + 1}. {tip.title}
                </span>

                {active === i && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute top-4 right-4 h-2 w-2 rounded-full bg-(--color-ivory)"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* DETAIL */}
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="h-full rounded-3xl border border-(--color-wine-red)/20 bg-(--color-ivory) p-12 shadow-xl"
              >
                <h3 className="mb-4 text-3xl font-bold text-(--color-wine-red)">{tips[active].title}</h3>

                <p className="mb-6 text-lg leading-relaxed text-(--color-wine-red)/75">{tips[active].body}</p>

                {/* Perfect For */}
                <div className="mb-6">
                  <p className="mb-2 font-medium text-(--color-wine-red)">Perfect For</p>
                  <div className="flex flex-wrap gap-2">
                    {tips[active].perfectFor.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-(--color-wine-red)/10 px-4 py-1 text-sm text-(--color-wine-red)"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rooms */}
                <div className="mb-8">
                  <p className="mb-2 font-medium text-(--color-wine-red)">Suggested Rooms</p>
                  <p className="text-sm text-(--color-wine-red)/70">{tips[active].rooms.join(' • ')}</p>
                </div>

                <div className="my-8 h-px bg-(--color-wine-red)/15" />

                {/* Checklist */}
                <p className="mb-3 font-medium text-(--color-wine-red)">Styling Checklist</p>

                <ul className="space-y-3 text-sm text-(--color-wine-red)/75">
                  {tips[active].checklist.map((item, i) => (
                    <li key={i}>✓ {item}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* MOBILE ACCORDION */}
        <div className="space-y-4 md:hidden">
          {tips.map((tip, i) => {
            const open = active === i

            return (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-(--color-wine-red)/20 bg-(--color-ivory)"
              >
                <button
                  onClick={() => setActive(open ? -1 : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-(--color-wine-red)">{tip.title}</span>

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
                      <div className="px-6 pb-6 text-(--color-wine-red)/75">{tip.body}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
