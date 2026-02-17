'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X } from 'lucide-react'

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const activeFilter = searchParams.get('filter')

  const handleFilterChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams)
    params.delete('filter')

    if (value) {
      params.set('filter', value)
    }

    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/products')
  }

  const filterOptions = [
    { id: 'all', label: 'All Products', value: null },
    { id: 'channapatna', label: 'Hues of Channapatna', value: 'origin:Hues of Channapatna' },
    { id: 'bidar', label: 'Regal Bidar', value: 'origin:Regal Bidar' },
    { id: 'bestsellers', label: 'Bestsellers', value: 'bestsellers' },
    { id: 'signature', label: 'Signature Pieces', value: 'featured' }
  ] as const

  return (
    <div className="space-y-6">
      {/* Clear filters button - shown when filter is active */}
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

      {/* Filter card */}
      <Card className="border border-(--color-wine-red)/20 bg-(--color-ivory) shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-(--color-wine-red)">Discover</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {filterOptions.map(option => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-3 text-sm text-(--color-wine-red) transition-colors hover:text-(--color-wine-red)/80"
            >
              <input
                type="radio"
                name="product-filter"
                checked={activeFilter === option.value || (!activeFilter && option.value === null)}
                onChange={() => handleFilterChange(option.value)}
                className="h-4 w-4 accent-(--color-wine-red)"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
