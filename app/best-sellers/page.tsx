import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import ProductFilters from '@/components/product-filters'
import ProductGrid from '@/components/product-grid'
import DiscountBanner from '@/components/discount-banner'
import DiscountClaimModal from '@/components/discount-claim-modal'
import fetchBestSellerProducts from '@/utils/queries/best-sellers'

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

  let products: any[] = []
  try {
    products = await fetchBestSellerProducts() // ← updated call
  } catch (e) {
    products = []
    console.error('Failed to fetch signature products:', e)
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
      {/* <DiscountBanner />
      <DiscountClaimModal /> */}

      <main>
        {/* Hero */}
        <section className="bg-(--color-wine-red) py-12 text-(--color-ivory) md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-center text-4xl font-bold md:text-5xl">Our Best Pieces</h1>
            <p className="mt-4 text-center text-lg text-(--color-ivory)/80">
              Discover authentic heritage pieces from master artisans
            </p>
          </div>
        </section>

        {/* Products */}
        <section className="bg-background py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
              {/* Filters */}
              {/* <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Suspense
                    fallback={<div className="py-8 text-center text-(--color-wine-red)/70">Loading filters…</div>}
                  >
                    <ProductFilters categories={uniqueCategories} vendors={uniqueVendors} />
                  </Suspense>
                </div>
              </div> */}

              {/* Grid */}
              <div className="lg:col-span-4">
                <Suspense
                  fallback={<div className="py-16 text-center text-(--color-wine-red)/70">Loading products…</div>}
                >
                  {productsForGrid.length > 0 ? (
                    <ProductGrid products={productsForGrid} />
                  ) : (
                    <div className="flex min-h-96 flex-col items-center justify-center text-center">
                      <p className="mb-4 text-lg text-(--color-wine-red)/70">
                        No products found matching your filters.
                      </p>

                      <Link
                        href="/products"
                        className="font-medium text-(--color-wine-red) underline underline-offset-4"
                      >
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
