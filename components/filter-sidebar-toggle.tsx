'use client'

import { useState } from 'react'
import ProductFilters from '@/components/product-filters'

interface Props {
  categories: { id: string; name: string }[]
  vendors: { id: string; name: string }[]
}

export default function FiltersSidebarToggle({ categories, vendors }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="mb-6 w-full rounded-md border border-(--color-wine-red) px-4 py-2 font-medium text-(--color-wine-red) transition hover:bg-(--color-wine-red) hover:text-(--color-ivory)"
      >
        {open ? 'Hide Categories' : 'Show Categories'}
      </button>

      {/* Filters Section (Hidden by default) */}
      {open && (
        <div className="sticky top-24">
          <ProductFilters categories={categories} vendors={vendors} />
        </div>
      )}
    </div>
  )
}
