import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import ProductFilters from '@/components/product-filters'
import ProductGrid from '@/components/product-grid'
import DiscountBanner from '@/components/discount-banner'
import DiscountClaimModal from '@/components/discount-claim-modal'

import fetchProducts from '@/utils/queries/page'

export const metadata: Metadata = {
  title: 'Products - The Heritage Collective',
  description: 'Browse our collection of traditional artifacts and heritage pieces from artisans worldwide.'
}

export default async function Products({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams

  let products: any[] = []
  try {
    products = await fetchProducts()
  } catch (e) {
    products = []
  }

  const uniqueCategories = Array.from(new Set(products.map((p: any) => p.productCategory).filter(Boolean))).map(
    name => ({ id: name, name })
  )

  const uniqueVendors = Array.from(new Set(products.map((p: any) => p.vendor?.vendorName).filter(Boolean))).map(
    name => ({ id: name, name })
  )

  const productsForGrid = products.map((p: any) => ({
    id: `${p.productId}-${p.slug}`,
    slug: p.slug,
    title: p.productTitle,
    description: p.productDescription,
    image: p.productImagesCollection?.items?.[0]?.url ?? '/traditional-indian-artifact.jpg',
    price: Number(p.productPrice) || 0,
    category: p.productCategory,
    vendor: p.vendor?.vendorName
  }))

  return (
    <>
      <DiscountBanner />
      <DiscountClaimModal />

      <main>
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-balance md:text-5xl">Our Collections</h1>
            <p className="mt-4 text-lg opacity-90">Discover authentic heritage pieces from master artisans</p>
          </div>
        </section>

        {/* Products Section – layout & spacing from template */}
        <section className="bg-background py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
              {/* Filters */}
              <div className="lg:col-span-1">
                <Suspense fallback={<div className="py-8 text-center">Loading filters...</div>}>
                  <ProductFilters categories={uniqueCategories} vendors={uniqueVendors} />
                </Suspense>
              </div>

              {/* Product Grid */}
              <div className="lg:col-span-4">
                <Suspense fallback={<div className="py-16 text-center">Loading products...</div>}>
                  {productsForGrid.length > 0 ? (
                    <ProductGrid products={productsForGrid} />
                  ) : (
                    <div className="flex min-h-96 flex-col items-center justify-center text-center">
                      <p className="text-muted-foreground mb-4 text-lg">No products found matching your filters.</p>
                      <Link href="/products" className="text-primary hover:underline">
                        Clear filters
                      </Link>
                    </div>
                  )}
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
