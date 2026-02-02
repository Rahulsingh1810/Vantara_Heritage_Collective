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
    <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.35 }} className="group h-full">
      <Card className="flex h-full flex-col overflow-hidden rounded-2xl border border-(--color-wine-red)/20 bg-(--color-ivory) pt-0 shadow-sm transition-all hover:shadow-xl">
        {/* Image */}
        <CardContent className="relative overflow-hidden p-0">
          <div className="relative aspect-2/3 w-full overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
            />

            {/* Soft overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </CardContent>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6">
          <Link href={`/products/${product.slug}`}>
            <h3 className="mb-2 line-clamp-2 text-lg font-semibold tracking-tight text-(--color-wine-red) transition group-hover:underline">
              {product.title}
            </h3>
          </Link>

          <p className="mb-4 line-clamp-2 flex-1 text-sm text-(--color-wine-red)/70">{product.description}</p>

          {/* Pills */}
          <div className="mb-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-(--color-wine-red)/20 bg-(--color-wine-red)/5 px-3 py-1 text-xs text-(--color-wine-red)">
              {product.category || 'Artifact'}
            </span>

            <span className="rounded-full border border-(--color-wine-red)/20 bg-(--color-wine-red)/5 px-3 py-1 text-xs text-(--color-wine-red)">
              {product.vendor || 'Heritage'}
            </span>
          </div>

          {/* Price */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <span className="text-2xl font-bold text-(--color-wine-red)">
              ₹{ensureNumber(product.price).toFixed(2)}
            </span>
          </motion.div>
        </div>

        {/* CTA */}
        <CardFooter className="p-6 pt-0">
          <Link href={`/products/${product.slug}`} className="w-full">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button className="w-full rounded-xl bg-(--color-wine-red) text-(--color-ivory) shadow hover:bg-(--color-wine-red)/90">
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
