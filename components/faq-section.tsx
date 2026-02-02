'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: 'What does GI-tagging mean?',
    answer:
      'The Geographical Indication tag is given to products belonging to specific places with attributes unique to that region, reflecting its cultural lineage and craftsmanship.'
  },
  {
    question: 'How does Vadānya source GI-tagged artefacts?',
    answer:
      'We source directly from authorised artisans within origin locales, ensuring each piece carries genuine cultural and geographic truth.'
  },
  {
    question: 'Are techniques unique to specific regions?',
    answer:
      'While some techniques overlap, each region maintains distinct materials, methods, and artistic heritage refined over centuries.'
  },
  {
    question: 'Why do slight variations occur?',
    answer:
      'Every artefact is handcrafted. Natural variation reflects authenticity, patience, and individual artistic expression.'
  },
  {
    question: 'How long does it take to create a piece?',
    answer: 'On average, creation takes at least ten days, balancing preparation, carving, drying, and finishing.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Currently we ship within India. International shipping is coming soon.'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-background py-28">
      <div className="mx-auto max-w-3xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-(--color-wine-red) md:text-4xl">Understanding Our Pieces</h2>

          <p className="text-lg text-(--color-wine-red)/70">
            Frequently asked questions about GI-tagged heritage artefacts
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const open = openIndex === index

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`rounded-2xl border transition-all ${
                  open
                    ? 'border-(--color-wine-red) bg-(--color-ivory) shadow-xl'
                    : 'border-(--color-wine-red)/25 bg-(--color-ivory)'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between px-8 py-6 text-left"
                >
                  <span
                    className={`text-lg font-semibold transition ${
                      open ? 'text-(--color-wine-red)' : 'text-(--color-wine-red)/80'
                    }`}
                  >
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  >
                    <ChevronDown className="h-5 w-5 text-(--color-wine-red)" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: 8 }}
                        animate={{ y: 0 }}
                        exit={{ y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="px-8 pb-7 text-(--color-wine-red)/75"
                      >
                        {faq.answer}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
