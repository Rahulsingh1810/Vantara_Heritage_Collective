"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ensureNumber } from "@/lib/utils"

export default function ProductShowcaseCarousel({ products }: { products: any[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [products.length])

  const currentProduct = products[current]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-background to-accent/20 border-2 border-primary/30"
    >
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 p-8 md:p-16 items-center min-h-[500px]">
        {/* Image Section */}
        <motion.div variants={itemVariants} className="relative h-96 lg:h-full min-h-96 rounded-xl overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={currentProduct?.image_url || "/placeholder.svg?height=400&width=400&query=heritage+artifact"}
              alt={currentProduct?.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
            />
          </div>

          {/* Floating Badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-md px-4 py-3 rounded-lg border border-primary/50"
          >
            <p className="text-sm font-semibold text-primary">Featured Artisan Piece</p>
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-primary/20 rounded-full text-primary font-semibold text-sm mb-4"
            >
              {currentProduct?.category_name || "Heritage Artifact"}
            </motion.span>

            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{currentProduct?.name}</h3>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {currentProduct?.description || "A beautiful piece of traditional craftsmanship"}
            </p>
          </div>

          {/* Stats */}
          <motion.div variants={containerVariants} className="grid grid-cols-2 gap-4 py-6 border-y border-border">
            <motion.div variants={itemVariants}>
              <p className="text-3xl font-bold text-primary">${ensureNumber(currentProduct?.price).toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Premium Price</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="text-3xl font-bold text-accent">{currentProduct?.stock_quantity}</p>
              <p className="text-sm text-muted-foreground">Available</p>
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href={`/products/${currentProduct?.id}`}>
              <Button size="lg" className="w-full md:w-fit group">
                Explore This Piece
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <ArrowRight className="w-5 h-5" />
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
        className="absolute bottom-8 left-8 right-8 flex gap-3 justify-center md:justify-start"
      >
        {products.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${index === current ? "bg-primary w-8" : "bg-border w-2"}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
