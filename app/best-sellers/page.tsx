import type { Metadata } from 'next'
import Link from 'next/link'
import ProductGrid from '@/components/product-grid'
import fetchBestSellerProducts from '@/utils/queries/best-sellers'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Best Sellers - Vadānya Heritage Collective',
  description: 'Browse our collection of traditional artifacts and heritage pieces from artisans worldwide.'
}

export default async function BestSellers() {
  let products: any[] = []
  try {
    products = await fetchBestSellerProducts()
  } catch (e) {
    products = []
    console.error('Failed to fetch best seller products:', e)
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
            {/* Grid */}
            <div className="lg:col-span-4">
              {productsForGrid.length > 0 ? (
                <ProductGrid products={productsForGrid} />
              ) : (
                <div className="flex min-h-96 flex-col items-center justify-center text-center">
                  <p className="mb-4 text-lg text-(--color-wine-red)/70">No products found matching your filters.</p>

                  <Link href="/products" className="font-medium text-(--color-wine-red) underline underline-offset-4">
                    View All Products
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
