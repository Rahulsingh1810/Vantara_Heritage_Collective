'use client'

import type React from 'react'

import { useState } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface ContactFormPopupProps {
  onClose: () => void
}

export default function ContactFormPopup({ onClose }: ContactFormPopupProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsSubmitted(true)
        toast.success('Message sent successfully!')

        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            message: ''
          })
          setIsSubmitted(false)
          onClose()
        }, 2000)
      } else {
        toast.error(data.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      toast.error('An unexpected error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={e => e.stopPropagation()}
          className="bg-background border-border w-full max-w-md rounded-lg border shadow-2xl"
        >
          {/* Header */}
          <div className="border-border flex items-center justify-between border-b p-6">
            <h2 className="text-2xl font-bold">Get in Touch</h2>

            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {isSubmitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center">
                <div className="mb-4 text-5xl">✨</div>

                <h3 className="mb-2 text-xl font-semibold">Thank You!</h3>

                <p className="text-muted-foreground">We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Name</label>

                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        name: e.target.value
                      })
                    }
                    className="border-border bg-card focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Email</label>

                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        email: e.target.value
                      })
                    }
                    className="border-border bg-card focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Message</label>

                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        message: e.target.value
                      })
                    }
                    className="border-border bg-card focus:ring-primary w-full resize-none rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                    placeholder="Your message..."
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
