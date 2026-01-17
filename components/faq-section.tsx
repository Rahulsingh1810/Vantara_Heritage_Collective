"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

const faqs = [
  {
    question: "How do you verify the authenticity of artifacts?",
    answer:
      "Each piece is carefully vetted by our team of heritage experts. We work directly with traditional artisans and conduct thorough authentication processes to ensure every artifact meets our strict authenticity standards.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all products in original condition. If you're not completely satisfied with your purchase, we'll provide a full refund or exchange.",
  },
  {
    question: "How long does shipping typically take?",
    answer:
      "Domestic orders usually arrive within 7-14 business days. International shipping takes 15-30 business days depending on location. We provide tracking information for all orders.",
  },
  {
    question: "Do you offer bulk orders or wholesale pricing?",
    answer:
      "Yes! We offer special pricing for bulk and wholesale orders. Please contact our sales team at wholesale@heritagecollective.com for more information.",
  },
  {
    question: "Are your products ethically sourced?",
    answer:
      "Absolutely. We partner exclusively with artisans and communities that follow fair trade practices and sustainable production methods. Your purchase directly supports these communities.",
  },
  {
    question: "Can I customize or personalize artifacts?",
    answer:
      "Many of our artisans offer customization services. Please contact us directly with your specific requests, and we'll connect you with the appropriate craftsperson.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">Everything you need to know about our heritage artifacts</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-card border border-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-lg text-left">{faq.question}</span>
                <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                </motion.div>
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 bg-muted/30 text-muted-foreground border-t border-border">{faq.answer}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
