'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import ProductCardEnhanced from './product-card-enhanced'

export default function FeaturedProductsSlider({ products }: { products: any[] }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const itemsPerView = 3
  const totalPages = Math.ceil(products.length / itemsPerView)

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrent(prev => {
      let next = prev + newDirection
      if (next < 0) next = totalPages - 1
      if (next >= totalPages) next = 0
      return next
    })
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const displayedProducts = products.slice(current * itemsPerView, (current + 1) * itemsPerView)

  return (
    <div className="relative">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 }
          }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {displayedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCardEnhanced product={product} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="mt-12 flex justify-center gap-4">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={() => paginate(-1)} variant="outline" size="lg" className="h-12 w-12 rounded-full p-0">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > current ? 1 : -1)
                setCurrent(index)
              }}
              className={`rounded-full transition-all ${
                index === current ? 'bg-primary h-3 w-8' : 'bg-border h-3 w-3'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={() => paginate(1)} variant="outline" size="lg" className="h-12 w-12 rounded-full p-0">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
