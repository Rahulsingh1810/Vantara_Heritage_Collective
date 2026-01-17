"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart } from "lucide-react"
import { ensureNumber } from "@/lib/utils"
import { motion } from "framer-motion"
import { useState } from "react"

export default function ProductCardEnhanced({ product }: { product: any }) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="group h-full">
      <Card className="overflow-hidden h-full flex flex-col border-2 hover:border-primary transition-colors bg-card">
        {/* Image Container */}
        <CardContent className="p-0 flex-shrink-0 relative overflow-hidden bg-muted">
          <div className="relative h-72 w-full">
            <Image
              src={product.image_url || "/placeholder.svg?height=288&width=288&query=heritage+artifact"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Stock Status Badge */}
            {product.stock_quantity === 0 ? (
              <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold">
                Out of Stock
              </div>
            ) : (
              <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                In Stock
              </div>
            )}

            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-primary text-primary" : "text-muted-foreground"}`} />
            </motion.button>
          </div>
        </CardContent>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors mb-2 line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2">{product.description}</p>

          {/* Category/Vendor */}
          <div className="flex gap-2 mb-4">
            <span className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground">
              {product.category_name || "Artifact"}
            </span>
            <span className="text-xs bg-accent/10 px-3 py-1 rounded-full text-accent">
              {product.vendor_name || "Heritage"}
            </span>
          </div>

          {/* Price and Stock */}
          <div className="flex justify-between items-center mb-4">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold text-primary">
              ${ensureNumber(product.price).toFixed(2)}
            </motion.span>
            {product.stock_quantity > 0 && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
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
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.stock_quantity === 0 ? "Out of Stock" : "View Details"}
              </Button>
            </motion.div>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
