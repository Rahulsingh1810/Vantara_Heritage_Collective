'use client'

import ProductCardEnhanced from '@/components/product-card-enhanced'

export default function FeaturedProducts({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {products.map(product => (
        <ProductCardEnhanced key={product.id} product={product} />
      ))}
    </div>
  )
}
