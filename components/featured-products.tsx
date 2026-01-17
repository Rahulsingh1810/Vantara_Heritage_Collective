"use client"

import ProductCardEnhanced from "@/components/product-card-enhanced"

export default function FeaturedProducts({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCardEnhanced key={product.id} product={product} />
      ))}
    </div>
  )
}
