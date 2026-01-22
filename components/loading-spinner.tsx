'use client'

import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const dotVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 1.4,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-100">
      <div className="text-center">
        <motion.div
          className="mb-8 flex items-center justify-center gap-2"
          variants={containerVariants}
          animate="animate"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="h-4 w-4 rounded-full bg-gradient-to-r from-amber-600 to-yellow-600"
              variants={dotVariants}
            />
          ))}
        </motion.div>

        <div className="mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
            className="mx-auto mb-4 h-16 w-16 rounded-full border-4 border-amber-200 border-t-amber-700"
          />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-2 text-2xl font-bold text-amber-900"
        >
          Loading Heritage
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-amber-700"
        >
          Preparing your dashboard...
        </motion.p>
      </div>
    </div>
  )
}
