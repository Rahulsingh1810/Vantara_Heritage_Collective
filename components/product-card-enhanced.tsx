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
  console.log('Rendering product card:', product)

  return (
    <Link
      href={`/products/${product.slug}`}
      className="block overflow-hidden rounded-lg border transition hover:shadow-lg"
    >
      <div className="bg-muted relative aspect-[4/3]">
        <Image src={product.image} alt={product.title} fill className="object-cover" />
      </div>

      <div className="space-y-2 p-4">
        <h3 className="text-lg font-semibold">{product.title}</h3>

        <p className="text-muted-foreground line-clamp-2 text-sm">{product.description}</p>

        <p className="text-lg font-bold">₹{product.price}</p>
      </div>
    </Link>
  )
}
