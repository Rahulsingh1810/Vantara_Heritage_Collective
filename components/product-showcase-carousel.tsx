'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function ProductShowcaseCarousel({ products }: { products: any[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [products.length])

  const currentProduct = products[current]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-[var(--color-wine-red)]/10"
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[var(--color-wine-red)]/10 blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[var(--color-wine-red)]/10 blur-3xl"
        />
      </div>

      <div className="relative grid min-h-[500px] grid-cols-1 items-center gap-8 p-8 md:p-16 lg:grid-cols-2">
        {/* Image */}
        <motion.div variants={itemVariants} className="relative h-96 overflow-hidden rounded-xl lg:h-full">
          <Image
            src={currentProduct?.image_url}
            alt={currentProduct?.name}
            fill
            className="rounded-xl object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div>
            <h3 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
              {currentProduct?.name}
            </h3>

            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              {currentProduct?.description}
            </p>
          </div>

          {/* CTA */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href={currentProduct?.slug}>
              <Button size="lg" className="group w-full md:w-fit">
                Explore Collection
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-center gap-3 md:justify-start">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${
              index === current ? 'w-8 bg-primary' : 'w-2 bg-border'
            }`}
          />
        ))}
      </div>
    </motion.div>
  )
}
