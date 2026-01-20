'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Heart } from 'lucide-react'
import { ensureNumber } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ProductCardEnhanced({ product }: { product: any }) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="group h-full">
      <Card className="hover:border-primary bg-card flex h-full flex-col overflow-hidden border-2 transition-colors">
        {/* Image Container */}
        <CardContent className="bg-muted relative flex-shrink-0 overflow-hidden p-0">
          <div className="relative h-72 w-full">
            <Image
              src={product.image_url || '/placeholder.svg?height=288&width=288&query=heritage+artifact'}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Stock Status Badge */}
            {product.stock_quantity === 0 ? (
              <div className="bg-destructive text-destructive-foreground absolute top-3 left-3 rounded-full px-3 py-1 text-sm font-semibold">
                Out of Stock
              </div>
            ) : (
              <div className="bg-primary text-primary-foreground absolute top-3 left-3 rounded-full px-3 py-1 text-sm font-semibold">
                In Stock
              </div>
            )}

            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="bg-background/80 hover:bg-background absolute top-3 right-3 rounded-full p-2 backdrop-blur-sm transition-colors"
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
            </motion.button>
          </div>
        </CardContent>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <Link href={`/products/${product.id}`}>
            <h3 className="group-hover:text-primary mb-2 line-clamp-2 text-lg font-bold transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="text-muted-foreground mb-4 line-clamp-2 flex-1 text-sm">{product.description}</p>

          {/* Category/Vendor */}
          <div className="mb-4 flex gap-2">
            <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs">
              {product.category_name || 'Artifact'}
            </span>
            <span className="bg-accent/10 text-accent rounded-full px-3 py-1 text-xs">
              {product.vendor_name || 'Heritage'}
            </span>
          </div>

          {/* Price and Stock */}
          <div className="mb-4 flex items-center justify-between">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary text-3xl font-bold">
              ${ensureNumber(product.price).toFixed(2)}
            </motion.span>
            {product.stock_quantity > 0 && (
              <span className="text-muted-foreground bg-muted rounded px-2 py-1 text-xs">
                {product.stock_quantity} available
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <CardFooter className="p-5 pt-0">
          <Link href={`/products/${product.id}`} className="w-full">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
              <Button className="w-full" disabled={product.stock_quantity === 0}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {product.stock_quantity === 0 ? 'Out of Stock' : 'View Details'}
              </Button>
            </motion.div>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
