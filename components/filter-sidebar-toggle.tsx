'use client'

import { useState } from 'react'
import ProductFilters from '@/components/product-filters'
import { ChevronDown } from 'lucide-react'

export default function FiltersSidebarToggle() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-4">
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex w-full items-center justify-between rounded-lg border border-(--color-wine-red)/40 bg-(--color-ivory) px-4 py-3 font-medium text-(--color-wine-red) shadow-sm transition hover:border-(--color-wine-red) hover:bg-(--color-wine-red)/5 lg:hidden"
      >
        <span>{open ? 'Hide Filters' : 'Filter Products'}</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Filters content - always visible on lg+, toggled on mobile */}
      <div className={`${open ? 'block' : 'hidden'} sticky top-24 lg:block`}>
        <ProductFilters />
      </div>
    </div>
  )
}
