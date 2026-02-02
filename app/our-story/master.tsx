'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const steps = [
  {
    title: 'Finding Craft at the Source',
    body: `Our journey begins within regions where traditions live and breathe. We work directly with artisans in their native locales, allowing each piece to carry the cultural and geographic truth of its origin.`,
    highlight: 'Direct artisan partnerships • Regional authenticity'
  },
  {
    title: 'Honouring the Pace of Making',
    body: `The craft we curate cannot be accelerated. Skills refined through repetition, materials shaped by climate, and techniques carried through memory determine the rhythm of creation.`,
    highlight: 'Time-honoured techniques • Slow craftsmanship'
  },
  {
    title: 'Curating with Intent',
    body: `Each artefact is chosen for cultural provenance, material honesty, and fidelity to traditional methods. Our collections remain intentionally small.`,
    highlight: 'Limited editions • Cultural integrity'
  },
  {
    title: 'Heritage in Contemporary Living',
    body: `Every piece is selected for its ability to retain cultural essence while finding relevance in modern living spaces.`,
    highlight: 'Tradition meets modern design'
  }
]

export default function CurationMasterDetail() {
  const [active, setActive] = useState(0)

  return (
    <section className="mt-20">
      <h2 className="mb-14 text-center text-3xl font-bold text-(--color-wine-red) md:text-left">
        Our Curation Process
      </h2>

      {/* DESKTOP */}
      <div className="hidden gap-14 md:grid md:grid-cols-3">
        {/* MASTER */}
        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative w-full rounded-2xl border p-6 text-left transition ${
                active === i
                  ? 'bg-(--color-wine-red) text-(--color-ivory) shadow-xl'
                  : 'border-(--color-wine-red)/20 bg-(--color-ivory) text-(--color-wine-red) hover:shadow-md'
              }`}
            >
              <span className="text-lg font-semibold">
                {i + 1}. {step.title}
              </span>

              {active === i && (
                <motion.span
                  layoutId="indicator"
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
              <h3 className="mb-4 text-3xl font-bold text-(--color-wine-red)">{steps[active].title}</h3>

              <p className="mb-6 text-lg leading-relaxed text-(--color-wine-red)/75">{steps[active].body}</p>

              <div className="rounded-xl bg-(--color-wine-red)/5 p-5">
                <p className="text-sm font-medium text-(--color-wine-red)">{steps[active].highlight}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* MOBILE ACCORDION */}
      <div className="space-y-4 md:hidden">
        {steps.map((step, i) => {
          const open = active === i

          return (
            <div key={i} className="rounded-xl border border-(--color-wine-red)/20 bg-(--color-ivory)">
              <button
                onClick={() => setActive(open ? -1 : i)}
                className="flex w-full items-center justify-between px-6 py-5"
              >
                <span className="font-semibold text-(--color-wine-red)">{step.title}</span>
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
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm text-(--color-wine-red)/75">{step.body}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
