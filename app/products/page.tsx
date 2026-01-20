// app/products/page.tsx
import type { Metadata } from 'next'
import ProductFilters from '@/components/product-filters'
import ProductGrid from '@/components/product-grid'
import DiscountBanner from '@/components/discount-banner'
import DiscountClaimModal from '@/components/discount-claim-modal'

// ── Use these imports ──
import fetchProducts from '@/utils/queries/page' // or wherever your fetchProducts is now

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

  // ── Fetch here ──
  const cfProducts = await fetchProducts()

  // ── Inspect raw data from Contentful ──
  console.log('=== RAW PRODUCTS FROM CONTENTFUL ===')
  console.log('Count:', cfProducts.length)
  console.log('First product (full):', cfProducts[0] ? JSON.stringify(cfProducts[0], null, 2) : 'No products')
  if (cfProducts.length > 0) {
    console.log('Available top-level keys in first product:', Object.keys(cfProducts[0]))
  }
  console.log('=====================================')

  // Basic filtering — extend as needed (client-side for now)
  const filtered = cfProducts.filter(p => {
    let match = true

    if (params.category) {
      const cat = String(params.category).toLowerCase()
      match = match && (p.productCategory || '').toLowerCase() === cat
    }

    return match
  })

  // Derive filter options
  const uniqueCategories = Array.from(new Set(cfProducts.map(p => p.productCategory).filter(Boolean))).map(name => ({
    id: name,
    name
  }))

  const uniqueVendors = Array.from(new Set(cfProducts.map(p => p.vendor?.vendorName).filter(Boolean))).map(name => ({
    id: name,
    name
  }))

  // Map to shape expected by ProductGrid
  const productsForGrid = filtered.map(p => ({
    id: p.productId || `temp-${Math.random().toString(36).slice(2, 10)}`,
    name: p.productTitle || 'Unnamed Product',
    description: p.productDescription || '',
    image_url: p.productImagesCollection?.items?.[0]?.url || '/traditional-indian-artifact.jpg',
    price: Number.parseFloat(String(p.productPrice || '0')) || 0,
    stock_quantity: 999,
    category_id: p.productCategory || null,
    vendor_id: p.vendor?.vendorName || null
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
