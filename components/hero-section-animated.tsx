'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function HeroSectionAnimated() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  }

  return (
    <section className="from-primary/30 via-background to-background relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b">
      {/* Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
          className="bg-primary/20 absolute top-20 right-20 h-96 w-96 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
          className="bg-accent/20 absolute -bottom-32 left-20 h-96 w-96 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="bg-primary/20 text-primary inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold">
            <Sparkles className="h-4 w-4" />
            Welcome to Heritage
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 variants={itemVariants} className="mb-6 text-5xl leading-tight font-bold text-balance md:text-7xl">
          Discover{' '}
          <motion.span
            className="relative inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="from-primary via-accent to-primary animate-gradient-shift absolute inset-0 bg-gradient-to-r bg-clip-text text-transparent blur-sm">
              Authentic Heritage
            </span>
            <span className="from-primary via-accent to-primary relative bg-gradient-to-r bg-clip-text text-transparent">
              Authentic Heritage
            </span>
          </motion.span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-balance md:text-xl"
        >
          Explore carefully curated traditional artifacts and cultural treasures from master artisans. Each piece tells
          a story of heritage and craftsmanship.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col justify-center gap-4 sm:flex-row">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/products">
              <Button size="lg" className="group">
                Shop Now
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </Button>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Learn Our Story
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          className="mt-20 text-6xl opacity-20 md:text-8xl"
        >
          🏺
        </motion.div>
      </motion.div>
    </section>
  )
}
