'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: 'What does GI-tagging mean?',
    answer:
      'The Geographical Indication tag is given to products belonging to specific places (cities, towns, or villages) with attributes considered unique to that place. The tag reflects the distinctive cultural tradition of the place in creation of the product.'
  },
  {
    question: 'How does Vadānya source GI-tagged artefacts?',
    answer:
      'We source the products directly from artisans and vendors (Authorised Users) of the locale. The products are manufactured at the origin place in a craftsmanship tradition carried on by generations.'
  },
  {
    question: 'Are the techniques unique to specific regions?',
    answer:
      'There are brief overlaps of the techniques, materials, and craftsmanship across a few regions, owing to cultural convergence. Nonetheless, there are some distinctive features and a lineage spanning centuries for every specific region — earning it the GI-tag in the first place.'
  },
  {
    question: 'Why do slight variations occur between pieces?',
    answer:
      'Each product is carefully hand-crafted with minimal manufacturing. The variations are a result of artistic endeavours in ensuring each piece gets the time and effort it deserves.'
  },
  {
    question: 'How long does it take to create a piece?',
    answer:
      'The woodworking process is a lengthy one — time-consuming in both the preparation and manufacturing stages. On average, creating a piece takes not less than ten days, so we encourage you to book products well in advance.'
  },
  {
    question: 'How can I stay informed about new releases?',
    answer:
      'We’re coming up with several new collections over the year from various other locales. Keep an eye on this space — or sign up for the newsletter to receive exclusive information (and some exciting goodies!).'
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Currently, we only ship to places in India. However, we’re expanding and will begin to ship internationally soon.'
  },
  {
    question: 'What are the delivery timelines?',
    answer:
      'It may take from 7 to 20 days after purchase for your products to be delivered. The fastest delivery timeline (7 days) is subject to availability of products in stock.'
  },
  {
    question: 'What is your returns or exchange policy?',
    answer:
      'We offer returns or exchanges for up to seven days after receipt. To be eligible for return and refund, a video at the time of unboxing is mandatory. Returns are accepted only for damaged products.'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-background py-12">
      <div className="mx-auto max-w-3xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-(--color-wine-red) md:text-4xl">Understanding Our Pieces</h2>

          <p className="text-lg text-(--color-wine-red)/70">Essential information about our heritage artefacts</p>
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
