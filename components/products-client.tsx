'use client'

import { useState, useMemo, useCallback } from 'react'
import ProductGrid, { type GridProduct } from '@/components/product-grid'
import FiltersSidebarToggle from '@/components/filter-sidebar-toggle'

type ProductsClientProps = {
  allProducts: GridProduct[]
}

export default function ProductsClient({ allProducts }: ProductsClientProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const handleFilterChange = useCallback((value: string | null) => {
    setActiveFilter(value)
  }, [])

  const filteredProducts = useMemo(() => {
    if (!activeFilter) return allProducts

    if (activeFilter === 'bestsellers') {
      return allProducts.filter(p => p.bestSellers === true)
    }

    if (activeFilter === 'featured') {
      return allProducts.filter(p => p.featured === true)
    }

    if (activeFilter.startsWith('origin:')) {
      const origin = activeFilter.replace('origin:', '')
      return allProducts.filter(p => p.productOrigin === origin)
    }

    return allProducts
  }, [allProducts, activeFilter])

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
      {/* Filters Column */}
      <div className="lg:col-span-1">
        <FiltersSidebarToggle activeFilter={activeFilter} onFilterChange={handleFilterChange} />
      </div>

      {/* Product Grid */}
      <div className="lg:col-span-4">
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="flex min-h-96 flex-col items-center justify-center text-center">
            <p className="mb-4 text-lg text-(--color-wine-red)/70">No products found matching your selection.</p>

            <button
              onClick={() => handleFilterChange(null)}
              className="font-medium text-(--color-wine-red) underline underline-offset-4"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
