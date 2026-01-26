'use client'

import Image from 'next/image'
import Link from 'next/link'

type ProductCardProps = {
  product: {
    id: string
    slug: string
    title: string
    description: string
    image: string
    price: number
  }
}

export default function ProductCardEnhanced({ product }: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg border transition-shadow hover:shadow-lg">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="bg-muted relative aspect-[4/3]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex h-full flex-col p-4">
        <h3 className="text-lg font-semibold">{product.title}</h3>

        {/* Description inside card */}
        <p className="text-muted-foreground mt-2 line-clamp-3 text-sm">
          {product.description}
        </p>

        <div className="mt-auto space-y-3">
          <p className="text-lg font-bold">₹{product.price}</p>

          {/* CTA Button */}
          <Link
            href={`/products/${product.slug}`}
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  )
}
