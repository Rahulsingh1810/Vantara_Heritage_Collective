'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'

export default function ProductFilters({ categories, vendors }: { categories: any[]; vendors: any[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '0')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '1000')
  const [isOpen, setIsOpen] = useState(true)
  const selectedCategory = searchParams.get('category')
  const selectedVendor = searchParams.get('vendor')

  const handleFilterChange = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams)
    value ? params.set(key, value) : params.delete(key)
    router.push(`/products?${params.toString()}`)
  }

  const handlePriceChange = () => {
    const params = new URLSearchParams(searchParams)
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => router.push('/products')

  return (
    <div className="space-y-6">
      {/* Mobile Toggle */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border-(--color-wine-red)/30 bg-(--color-ivory) text-(--color-wine-red) lg:hidden"
      >
        <ChevronDown className={`mr-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        {isOpen ? 'Hide Filters' : 'Show Filters'}
      </Button>

      {isOpen && (
        <div className="space-y-6">
          {/* Clear */}
          {(selectedCategory || selectedVendor || minPrice !== '0' || maxPrice !== '1000') && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full border-(--color-wine-red)/30 bg-(--color-ivory) text-(--color-wine-red)"
            >
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          )}

          {/* Category */}
          <Card className="border border-(--color-wine-red)/20 bg-(--color-ivory) shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-(--color-wine-red)">Category</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {categories.map(category => (
                <label
                  key={category.id}
                  className="flex cursor-pointer items-center gap-3 text-sm text-(--color-wine-red)"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategory === String(category.id)}
                    onChange={e => handleFilterChange('category', e.target.checked ? String(category.id) : null)}
                    className="h-4 w-4 accent-(--color-wine-red)"
                  />
                  {category.name}
                </label>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
