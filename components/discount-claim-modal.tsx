'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DiscountClaimModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('discountModalSeen')
    if (!hasSeenModal) {
      const timer = setTimeout(() => setIsOpen(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    sessionStorage.setItem('discountModalSeen', 'true')
    setTimeout(() => setIsOpen(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4"
          >
            <div className="relative rounded-3xl border border-(--color-wine-red)/25 bg-(--color-ivory) p-10 shadow-2xl">
              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 rounded-full p-1 text-(--color-wine-red)/60 hover:bg-(--color-wine-red)/10 hover:text-(--color-wine-red)"
              >
                <X className="h-5 w-5" />
              </button>

              {!submitted ? (
                <>
                  {/* Header */}
                  <h2 className="mb-2 text-3xl font-bold text-(--color-wine-red)">Exclusive Offer</h2>

                  <p className="mb-8 text-(--color-wine-red)/70">
                    Enjoy <span className="font-semibold">20% off</span> your first order — straight to your inbox.
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="w-full rounded-xl border border-(--color-wine-red)/25 bg-(--color-ivory) px-4 py-3 text-(--color-wine-red) placeholder:text-(--color-wine-red)/40 focus:ring-2 focus:ring-(--color-wine-red)/40 focus:outline-none"
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full rounded-xl bg-(--color-wine-red) text-(--color-ivory) hover:bg-(--color-wine-red)/90"
                    >
                      Claim My 20% Discount
                    </Button>
                  </form>

                  {/* Trust note */}
                  <p className="mt-6 text-center text-xs text-(--color-wine-red)/60">
                    We respect your privacy. No spam — unsubscribe anytime.
                  </p>
                </>
              ) : (
                <div className="py-10 text-center">
                  <div className="mb-4 text-5xl">🎉</div>

                  <h3 className="mb-2 text-2xl font-bold text-(--color-wine-red)">You’re all set!</h3>

                  <p className="text-sm text-(--color-wine-red)/70">
                    Check your email for your exclusive discount code.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
