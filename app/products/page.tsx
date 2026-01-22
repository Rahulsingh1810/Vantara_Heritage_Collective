// app/products/page.tsx
import type { Metadata } from 'next'
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
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // ── Fetch from Contentful ──
  const products = await fetchProducts()
  console.log('Fetched products:', products)

  // ── Filtering ──
  const filtered = products.filter((p: any) => {
    let match = true

    if (searchParams.category) {
      match = match && p.productCategory?.toLowerCase() === String(searchParams.category).toLowerCase()
    }

    if (searchParams.vendor) {
      match = match && p.vendor?.vendorName?.toLowerCase() === String(searchParams.vendor).toLowerCase()
    }

    return match
  })

  // ── Sidebar filters ──
  const uniqueCategories = Array.from(new Set(products.map((p: any) => p.productCategory).filter(Boolean))).map(
    name => ({ id: name, name })
  )

  const uniqueVendors = Array.from(new Set(products.map((p: any) => p.vendor?.vendorName).filter(Boolean))).map(
    name => ({ id: name, name })
  )

  // ── IMPORTANT: UI-safe mapping ──
  const productsForGrid = filtered.map((p: any) => ({
    id: `${p.productId}-${p.slug}`, // React key (must be unique)
    slug: p.slug, // URL slug
    title: p.productTitle, // card title
    description: p.productDescription,
    image: p.productImagesCollection?.items?.[0]?.url ?? '/traditional-indian-artifact.jpg',
    price: Number(p.productPrice) || 0
  }))

  return (
    <>
      <DiscountBanner />
      <DiscountClaimModal />

      <main>
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold md:text-5xl">Our Collections</h1>
            <p className="mt-4 text-lg opacity-90">Discover authentic heritage pieces from master artisans</p>
          </div>
        </section>

        <section className="bg-background py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
              <div className="lg:col-span-1">
                <ProductFilters categories={uniqueCategories} vendors={uniqueVendors} />
              </div>

              <div className="lg:col-span-4">
                {productsForGrid.length > 0 ? (
                  <ProductGrid products={productsForGrid} />
                ) : (
                  <div className="flex min-h-96 flex-col items-center justify-center text-center">
                    <p className="text-muted-foreground mb-4 text-lg">No products found matching your filters.</p>
                    <a href="/products" className="text-primary hover:underline">
                      Clear filters
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
