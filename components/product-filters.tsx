'use client'

import { memo, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X } from 'lucide-react'

type ProductFiltersProps = {
  activeFilter: string | null
  onFilterChange: (value: string | null) => void
  origins?: string[]
}

const STORAGE_KEY = 'product-filter'
const EXPIRY_TIME = 45 * 60 * 1000 // 45 minutes

function ProductFilters({ activeFilter, onFilterChange, origins = [] }: ProductFiltersProps) {
  // Restore filter on first load
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(STORAGE_KEY)

      if (!stored) return

      const parsed = JSON.parse(stored)

      if (Date.now() > parsed.expiry) {
        localStorage.removeItem(STORAGE_KEY)
        return
      }

      onFilterChange(parsed.value)
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [onFilterChange])

  // Save whenever filter changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (activeFilter === null) {
      localStorage.removeItem(STORAGE_KEY)
      return
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        value: activeFilter,
        expiry: Date.now() + EXPIRY_TIME
      })
    )
  }, [activeFilter])

  const handleFilterChange = (value: string | null) => {
    onFilterChange(value)
  }

  const clearFilters = () => {
    localStorage.removeItem(STORAGE_KEY)
    onFilterChange(null)
  }

  const originOptions = useMemo(() => {
    return origins.map(origin => ({
      id: origin.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      label: origin,
      value: `origin:${origin}`
    }))
  }, [origins])

  return (
    <div className="space-y-6">
      {activeFilter && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full border-(--color-wine-red)/30 bg-(--color-ivory) text-(--color-wine-red) hover:bg-(--color-wine-red)/10"
        >
          <X className="mr-2 h-4 w-4" />
          Clear Filter
        </Button>
      )}

      <Card className="border border-(--color-wine-red)/20 bg-(--color-ivory) shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-(--color-wine-red)">Discover</CardTitle>
        </CardHeader>

        <CardContent className="space-y-1">
          {/* All Products */}
          <label className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-(--color-wine-red) transition-colors hover:bg-(--color-wine-red)/5">
            <input
              type="radio"
              name="product-filter"
              checked={!activeFilter}
              onChange={() => handleFilterChange(null)}
              className="h-4 w-4 accent-(--color-wine-red)"
            />
            <span>All Products</span>
          </label>

          {/* Origins */}
          {originOptions.length > 0 && (
            <div className="ml-4 space-y-1 border-l border-(--color-wine-red)/20 pl-3">
              {originOptions.map(option => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-sm text-(--color-wine-red)/80 transition-colors hover:bg-(--color-wine-red)/5 hover:text-(--color-wine-red)"
                >
                  <input
                    type="radio"
                    name="product-filter"
                    checked={activeFilter === option.value}
                    onChange={() => handleFilterChange(option.value)}
                    className="h-3.5 w-3.5 accent-(--color-wine-red)"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          )}

          <div className="my-2 border-t border-(--color-wine-red)/10" />

          {/* Bestsellers */}
          <label className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-(--color-wine-red) transition-colors hover:bg-(--color-wine-red)/5">
            <input
              type="radio"
              name="product-filter"
              checked={activeFilter === 'bestsellers'}
              onChange={() => handleFilterChange('bestsellers')}
              className="h-4 w-4 accent-(--color-wine-red)"
            />
            <span>Bestsellers</span>
          </label>

          {/* Signature Pieces */}
          <label className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-(--color-wine-red) transition-colors hover:bg-(--color-wine-red)/5">
            <input
              type="radio"
              name="product-filter"
              checked={activeFilter === 'featured'}
              onChange={() => handleFilterChange('featured')}
              className="h-4 w-4 accent-(--color-wine-red)"
            />
            <span>Signature Pieces</span>
          </label>
        </CardContent>
      </Card>
    </div>
  )
}

export default memo(ProductFilters)
