import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import ProductGrid from '@/components/product-grid'
import FiltersSidebarToggle from '@/components/filter-sidebar-toggle'
// import DiscountBanner from '@/components/discount-banner'
// import DiscountClaimModal from '@/components/discount-claim-modal'

import fetchProducts from '@/utils/queries/page'

export const metadata: Metadata = {
  title: 'Products - Vandanya Heritage Collective',
  description: 'Browse our collection of traditional artifacts and heritage pieces from artisans worldwide.'
}

export default async function Products({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const filter = typeof params.filter === 'string' ? params.filter : null

  let rawProducts: any[] = []
  try {
    rawProducts = await fetchProducts()
  } catch (e) {
    console.error('Failed to fetch products:', e)
    rawProducts = []
  }

  // Apply filter logic (client-style filtering after fetching all)
  let products = rawProducts

  if (filter) {
    if (filter === 'bestsellers') {
      products = rawProducts.filter((p: any) => p.bestSellers === true)
    } else if (filter === 'featured') {
      products = rawProducts.filter((p: any) => p.featured === true)
    } else if (filter.startsWith('origin:')) {
      const origin = filter.replace('origin:', '')
      products = rawProducts.filter((p: any) => p.productOrigin === origin)
    }
  }

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
      {/* <DiscountBanner />
      <DiscountClaimModal /> */}

      <main>
        {/* Hero */}
        <section className="bg-(--color-wine-red) py-12 text-(--color-ivory) md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-center text-4xl font-bold md:text-5xl">Our Collections</h1>
            <p className="mt-4 text-center text-lg text-(--color-ivory)/80">
              Discover authentic heritage pieces from master artisans
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="bg-background py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
              {/* Filters Column */}
              <div className="lg:col-span-1">
                <Suspense
                  fallback={<div className="py-8 text-center text-(--color-wine-red)/70">Loading filters…</div>}
                >
                  <FiltersSidebarToggle />
                </Suspense>
              </div>

              {/* Product Grid */}
              <div className="lg:col-span-4">
                <Suspense
                  fallback={<div className="py-16 text-center text-(--color-wine-red)/70">Loading products…</div>}
                >
                  {productsForGrid.length > 0 ? (
                    <ProductGrid products={productsForGrid} />
                  ) : (
                    <div className="flex min-h-96 flex-col items-center justify-center text-center">
                      <p className="mb-4 text-lg text-(--color-wine-red)/70">
                        No products found matching your selection.
                      </p>

                      <Link
                        href="/products"
                        className="font-medium text-(--color-wine-red) underline underline-offset-4"
                      >
                        View All Products
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
