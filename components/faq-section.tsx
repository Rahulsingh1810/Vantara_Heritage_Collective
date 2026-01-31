'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

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
      'There are brief overlaps of the techniques, materials, and craftsmanship across a few regions, owing to cultural convergence. Nonetheless, there are some distinctive features and a lineage spanning centuries for every specific region - earning it the GI-tag in the first place.'
  },
  {
    question: 'Why do slight variations occur between pieces?',
    answer:
      'Each product is carefully hand-crafted with minimal manufacturing. The variations are a result of artistic endeavours in ensuring each piece gets the time and effort it deserves.'
  },
  {
    question: 'How long does it take to create a piece?',
    answer:
      'The woodworking process is a lengthy one - time-consuming in both the preparation stage and manufacturing stage. On average, creating a piece takes not less than ten days - so we encourage you to book the products well in advance keeping the timeline in mind.'
  },
  {
    question: 'How can I stay informed about new releases?',
    answer:
      'We’re coming up with several new collections over the year from various other locales. Keep an eye out on this space - or even sign up for the newsletter to receive exclusive information (and some exciting goodies!)'
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
      'We offer returns / exchange for up to seven days after your receival. To be eligible for return and refund, a video at the time of unboxing is mandatory. Returns are made only on damaged products.'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-balance md:text-4xl">
            Understanding Our Pieces
          </h2>
          <p className="text-muted-foreground text-lg">
            Frequently asked questions about our GI-tagged heritage artefacts
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-card border-border overflow-hidden rounded-xl border shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="hover:bg-muted/50 flex w-full items-center justify-between px-6 py-5 text-left transition-colors"
              >
                <span className="text-lg font-semibold leading-tight">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-primary h-6 w-6 flex-shrink-0" />
                </motion.div>
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="border-border border-t bg-muted/20 px-6 py-5 text-muted-foreground">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}