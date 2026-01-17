"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { X, ChevronDown } from "lucide-react"

export default function ProductFilters({ categories, vendors }: { categories: any[]; vendors: any[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "0")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "1000")
  const [isOpen, setIsOpen] = useState(true)
  const selectedCategory = searchParams.get("category")
  const selectedVendor = searchParams.get("vendor")

  const handleFilterChange = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/products?${params.toString()}`)
  }

  const handlePriceChange = () => {
    const params = new URLSearchParams(searchParams)
    if (minPrice) params.set("minPrice", minPrice)
    if (maxPrice) params.set("maxPrice", maxPrice)
    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/products")
  }

  return (
    <div className="space-y-6">
      {/* Toggle Button */}
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="w-full lg:hidden">
        <ChevronDown className={`w-4 h-4 mr-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        {isOpen ? "Hide Filters" : "Show Filters"}
      </Button>

      {/* Filters Container */}
      {isOpen && (
        <div className="space-y-6">
          {/* Clear Filters Button */}
          {(selectedCategory || selectedVendor || minPrice !== "0" || maxPrice !== "1000") && (
            <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
              <X className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          )}

          {/* Category Filter */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategory === String(category.id)}
                    onChange={(e) => handleFilterChange("category", e.target.checked ? String(category.id) : null)}
                    className="w-4 h-4 rounded accent-primary"
                  />
                  <span className="text-sm">{category.name}</span>
                </label>
              ))}
            </CardContent>
          </Card>

          {/* Vendor Filter */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Vendor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {vendors.map((vendor) => (
                <label key={vendor.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedVendor === String(vendor.id)}
                    onChange={(e) => handleFilterChange("vendor", e.target.checked ? String(vendor.id) : null)}
                    className="w-4 h-4 rounded accent-primary"
                  />
                  <span className="text-sm">{vendor.name}</span>
                </label>
              ))}
            </CardContent>
          </Card>

          {/* Price Range Filter */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Price Range</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Min Price: ${minPrice}</label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Max Price: ${maxPrice}</label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button onClick={handlePriceChange} className="w-full" size="sm">
                Apply Price Filter
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
