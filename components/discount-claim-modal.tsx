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
            className="fixed inset-0 z-40 bg-black/50"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="fixed top-1/2 left-1/2 z-50 mx-4 w-96 max-w-full -translate-x-1/2 -translate-y-1/2 transform"
          >
            <div className="bg-background border-primary rounded-xl border-2 p-8 shadow-2xl">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground absolute top-4 right-4 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {!submitted ? (
                <>
                  <h2 className="text-primary mb-2 text-3xl font-bold">Exclusive Offer!</h2>
                  <p className="text-muted-foreground mb-6">Get 20% off your first order</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="border-border bg-background focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                    />
                    <Button type="submit" className="w-full" size="lg">
                      Claim My 20% Discount
                    </Button>
                  </form>
                </>
              ) : (
                <div className="py-6 text-center">
                  <div className="mb-4 text-5xl">🎉</div>
                  <h3 className="text-primary mb-2 text-2xl font-bold">Success!</h3>
                  <p className="text-muted-foreground">Check your email for the discount code</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
