'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const tips = [
  {
    title: 'Balance Modern and Traditional',
    body: 'Create a dialogue between eras to make spaces feel grounded and current.',
    perfectFor: ['Modern Living Spaces', 'Contemporary Homes'],
    rooms: ['Living Room', 'Open Layouts'],
    checklist: [
      'Choose accent pieces in modern-day living spaces that stand out in the room',
      'Pair vivid and bright artefacts with neutral furniture to bring contrast',
      'Combine bright pieces with minimal decor or soft pieces with layered decor'
    ]
  },
  {
    title: 'Create Focal Points',
    body: 'Draw attention to artefacts from around the space.',
    perfectFor: ['Feature Walls', 'Statement Corners'],
    rooms: ['Living Room', 'Entryways'],
    checklist: [
      'Position statement pieces where they naturally command attention and anchor the room',
      'Allow for visual space and avoid clutter',
      'Use diffused spotlights to subtly highlight form and texture'
    ]
  },
  {
    title: 'Respect Colour Palettes',
    body: 'Create harmony with different hues and splashes of colour.',
    perfectFor: ['Warm Interiors', 'Curated Spaces'],
    rooms: ['Bedrooms', 'Living Areas'],
    checklist: [
      'Identify the dominant undertone in the room before introducing heritage colours',
      'Use artefacts to either complement or intentionally contrast the palette',
      'Place artefacts against a colour block to add a dramatic touch'
    ]
  },
  {
    title: 'Tell a Story',
    body: 'Every piece is a talking point — let it be known.',
    perfectFor: ['Collectors', 'Art Enthusiasts'],
    rooms: ['Study Rooms', 'Gallery Walls'],
    checklist: [
      'Group artefacts that share a material, origin, or mood',
      'Mix varying heights and proportions to create movement',
      'Use different spaces intentionally to situate different pieces'
    ]
  },
  {
    title: 'Layer Your Decor',
    body: 'Build depth through thoughtful arrangement.',
    perfectFor: ['Minimal Homes', 'Spacious Interiors'],
    rooms: ['Living Areas', 'Bedrooms'],
    checklist: [
      'Combine statement pieces with softer accents to add dimension',
      'Balance with clashing contrast for a bold look',
      'Avoid overcrowding and adopt a more fluid approach'
    ]
  },
  {
    title: 'Light It Well',
    body: 'Let each artefact shine and shimmer with pride.',
    perfectFor: ['Display Areas', 'Evening Ambience'],
    rooms: ['Entryways', 'Corners'],
    checklist: [
      'Use warm lighting to bring out natural tones and textures',
      'Avoid harsh overhead lights that flatten detail',
      'Allow shadows to add depth and sculptural character'
    ]
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
                {/* <div className="mb-6">
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
                </div> */}

                {/* Rooms */}
                {/* <div className="mb-8">
                  <p className="mb-2 font-medium text-(--color-wine-red)">Suggested Rooms</p>
                  <p className="text-sm text-(--color-wine-red)/70">{tips[active].rooms.join(' • ')}</p>
                </div> */}

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
