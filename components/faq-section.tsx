'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

const faqs = [
  {
    question: 'How do you verify the authenticity of artifacts?',
    answer:
      'Each piece is carefully vetted by our team of heritage experts. We work directly with traditional artisans and conduct thorough authentication processes to ensure every artifact meets our strict authenticity standards.'
  },
  {
    question: 'What is your return policy?',
    answer:
      "We offer a 30-day return policy for all products in original condition. If you're not completely satisfied with your purchase, we'll provide a full refund or exchange."
  },
  {
    question: 'How long does shipping typically take?',
    answer:
      'Domestic orders usually arrive within 7-14 business days. International shipping takes 15-30 business days depending on location. We provide tracking information for all orders.'
  },
  {
    question: 'Do you offer bulk orders or wholesale pricing?',
    answer:
      'Yes! We offer special pricing for bulk and wholesale orders. Please contact our sales team at wholesale@heritagecollective.com for more information.'
  },
  {
    question: 'Are your products ethically sourced?',
    answer:
      'Absolutely. We partner exclusively with artisans and communities that follow fair trade practices and sustainable production methods. Your purchase directly supports these communities.'
  },
  {
    question: 'Can I customize or personalize artifacts?',
    answer:
      "Many of our artisans offer customization services. Please contact us directly with your specific requests, and we'll connect you with the appropriate craftsperson."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-balance md:text-4xl">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">Everything you need to know about our heritage artifacts</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-card border-border overflow-hidden rounded-lg border"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="hover:bg-muted/50 flex w-full items-center justify-between px-6 py-4 transition-colors"
              >
                <span className="text-left text-lg font-semibold">{faq.question}</span>
                <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="text-primary h-5 w-5 flex-shrink-0" />
                </motion.div>
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: openIndex === index ? 'auto' : 0, opacity: openIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-muted/30 text-muted-foreground border-border border-t px-6 py-4">{faq.answer}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
