'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Check if splash screen has already been shown in this session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash')

    if (hasSeenSplash) {
      setIsVisible(false)
      return
    }

    // Show splash screen for 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      sessionStorage.setItem('hasSeenSplash', 'true')
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="from-primary via-accent to-primary fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[var(--color-wine-red)] backdrop-blur-lg"
    >
      {/* Animated Background Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
        className="absolute inset-0 opacity-10"
      >
        <div className="bg-primary-foreground absolute top-10 left-10 h-40 w-40 rounded-full blur-3xl" />
        <div className="bg-accent-foreground absolute right-10 bottom-10 h-40 w-40 rounded-full blur-3xl" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Icon */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          className="mb-8 text-8xl"
        >
          <img src="/ivorylogo.svg" alt="Vandanya Heritage Collective Logo" className="mx-auto h-42 w-42" />
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 text-5xl font-bold text-balance text-[var(--color-ivory)] md:text-6xl"
        >
          Vandanya Heritage Collective
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12 text-xl text-balance text-[var(--color-ivory)]/80 md:text-2xl"
        >
          Discover Authentic Heritage Artifacts
        </motion.p>

        {/* Loading Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center gap-2"
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2
              }}
              className="bg-primary-foreground h-3 w-3 rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
