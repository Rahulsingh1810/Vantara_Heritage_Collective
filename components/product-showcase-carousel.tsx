'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { ensureNumber } from '@/lib/utils'

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
      className="from-primary/20 via-background to-accent/20 border-primary/30 relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br"
    >
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
          className="bg-primary/10 absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
          className="bg-accent/10 absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl"
        />
      </div>

      <div className="relative grid min-h-[500px] grid-cols-1 items-center gap-8 p-8 md:gap-12 md:p-16 lg:grid-cols-2">
        {/* Image Section */}
        <motion.div variants={itemVariants} className="relative h-96 min-h-96 overflow-hidden rounded-xl lg:h-full">
          <div className="relative h-full w-full">
            <Image
              src={currentProduct?.image_url || '/placeholder.svg?height=400&width=400&query=heritage+artifact'}
              alt={currentProduct?.name}
              fill
              className="rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Floating Badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-background/90 border-primary/50 absolute bottom-4 left-4 rounded-lg border px-4 py-3 backdrop-blur-md"
          >
            <p className="text-primary text-sm font-semibold">Featured Artisan Piece</p>
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-primary/20 text-primary mb-4 inline-block rounded-full px-4 py-2 text-sm font-semibold"
            >
              {currentProduct?.category_name || 'Heritage Artifact'}
            </motion.span>

            <h3 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">{currentProduct?.name}</h3>

            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              {currentProduct?.description || 'A beautiful piece of traditional craftsmanship'}
            </p>
          </div>

          {/* Stats */}
          <motion.div variants={containerVariants} className="border-border grid grid-cols-2 gap-4 border-y py-6">
            <motion.div variants={itemVariants}>
              <p className="text-primary text-3xl font-bold">${ensureNumber(currentProduct?.price).toFixed(2)}</p>
              <p className="text-muted-foreground text-sm">Premium Price</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="text-accent text-3xl font-bold">{currentProduct?.stock_quantity}</p>
              <p className="text-muted-foreground text-sm">Available</p>
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href={`/products/${currentProduct?.id}`}>
              <Button size="lg" className="group w-full md:w-fit">
                Explore This Piece
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
        </motion.div>
      </div>

      {/* Carousel Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute right-8 bottom-8 left-8 flex justify-center gap-3 md:justify-start"
      >
        {products.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${index === current ? 'bg-primary w-8' : 'bg-border w-2'}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
