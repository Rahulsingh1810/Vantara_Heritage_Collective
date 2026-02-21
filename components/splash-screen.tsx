'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const today = new Date().toDateString()
    const lastSeen = localStorage.getItem('hasSeenSplash')

    if (lastSeen === today) {
      setIsVisible(false)
      return
    }

    const timer = setTimeout(() => {
      setIsVisible(false)
      localStorage.setItem('hasSeenSplash', today)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--color-wine-red)]"
    >
      {/* Soft ambient blobs (mobile-safe) */}
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute top-16 left-12 h-48 w-48 rounded-full bg-white blur-3xl" />
        <div className="absolute right-10 bottom-20 h-48 w-48 rounded-full bg-white blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Logo */}
        <motion.img
          src="/Ivory.png"
          alt="Vandanya Logo"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 h-28 w-28 object-contain md:h-36 md:w-36"
        />

        {/* Brand */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-3 max-w-xs text-2xl leading-tight font-bold text-[var(--color-ivory)] md:max-w-none md:text-4xl"
        >
          Vadanya Heritage Collective
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10 text-sm tracking-wide text-[var(--color-ivory)]/80 md:text-lg"
        >
          Discover Authentic Heritage Artifacts
        </motion.p>

        {/* Minimal loader */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="flex gap-2"
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="h-2 w-2 rounded-full bg-[var(--color-ivory)]"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
