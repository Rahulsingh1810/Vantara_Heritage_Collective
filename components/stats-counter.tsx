"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"

interface Stat {
  label: string
  value: number
  suffix: string
}

const stats: Stat[] = [
  { label: "Satisfied Customers", value: 5000, suffix: "+" },
  { label: "Heritage Pieces", value: 2500, suffix: "+" },
  { label: "Artisans Supported", value: 450, suffix: "+" },
  { label: "Years of Heritage", value: 100, suffix: "+" },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })

  useEffect(() => {
    if (!inView) return

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOutQuad = 1 - Math.pow(1 - progress, 2)
      setCount(Math.floor(value * easeOutQuad))

      if (currentStep === steps) clearInterval(timer)
    }, stepDuration)

    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-bold text-accent-foreground">
      {count}
      {suffix}
    </div>
  )
}

export default function StatsCounter() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants} className="text-center group">
            <motion.div whileHover={{ scale: 1.05 }} className="mb-4">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </motion.div>
            <p className="text-lg md:text-xl font-semibold text-accent-foreground group-hover:text-white transition-colors">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
