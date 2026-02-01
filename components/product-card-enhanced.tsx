'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { ensureNumber } from '@/lib/utils'
import { motion } from 'framer-motion'

type ProductCardProps = {
  product: {
    id: string
    slug: string
    title: string
    description: string
    image: string
    price: number
    category: string
    vendor: string
  }
}

export default function ProductCardEnhanced({ product }: ProductCardProps) {
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="group h-full">
      <Card className="hover:border-[var(--color-wine-red)] bg-[var(--color-ivory)] flex h-full flex-col overflow-hidden border-2 pt-0 transition-colors">
        {/* Image Container */}
        <CardContent className="bg-muted relative flex-shrink-0 overflow-hidden p-0">
          <div className="relative h-72 w-full">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </CardContent>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <Link href={`/products/${product.id}`}>
            <h3 className="group-hover:text-primary mb-2 line-clamp-2 text-lg font-bold transition-colors">
              {product.title}
            </h3>
          </Link>

          <p className="text-muted-foreground mb-4 line-clamp-2 flex-1 text-sm">{product.description}</p>

          {/* Category/Vendor */}
          <div className="mb-4 flex gap-2">
            <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs">
              {product.category || 'Artifact'}
            </span>
            <span className="bg-accent/10 text-accent rounded-full px-3 py-1 text-xs">
              {product.vendor || 'Heritage'}
            </span>
          </div>

          {/* Price and Stock */}
          <div className="mb-4 flex items-center justify-between">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary text-3xl font-bold">
              ₹{ensureNumber(product.price).toFixed(2)}
            </motion.span>
          </div>
        </div>

        {/* Footer */}
        <CardFooter className="p-5 pt-0">
          <Link href={`/products/${product.slug}`} className="w-full">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
              <Button className="bg-[var(--color-wine-red)] hover:bg-[var(--color-wine-red-dark)] text-[var(--color-ivory)] hover:text-[var(--color-wine-red)] w-full">
                <ShoppingCart className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </motion.div>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
