'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Product } from '@/type/page'

type ProductImageGalleryProps = {
  product: Product
}

export default function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const images = product?.productImagesCollection?.items?.map(img => img.url) || []
  const [currentIndex, setCurrentIndex] = useState(0)

  if (images.length === 0) {
    return (
      <div className="bg-muted text-muted-foreground flex aspect-square items-center justify-center rounded-xl">
        No images available
      </div>
    )
  }

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="bg-muted relative aspect-square w-full overflow-hidden rounded-xl">
        <Image
          src={images[currentIndex]}
          alt={`${product.productTitle} image ${currentIndex + 1}`}
          fill
          priority
          className="object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={goToNext}
              className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Scrollable Thumbnails */}
      {images.length > 1 && (
        <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative h-20 min-w-[80px] overflow-hidden rounded-lg border-2 transition ${
                currentIndex === index
                  ? 'border-primary ring-primary/40 ring-2'
                  : 'border-muted hover:border-primary/50'
              }`}
            >
              <Image src={image} alt={`${product.productTitle} thumbnail ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
