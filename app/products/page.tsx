import type { Metadata } from 'next'
import ProductsClient from '@/components/products-client'
import type { GridProduct } from '@/components/product-grid'
import fetchProducts from '@/utils/queries/page'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Products - Vadānya Heritage Collective',
  description: 'Browse our collection of traditional artifacts and heritage pieces from artisans worldwide.'
}

export default async function Products() {
  let rawProducts: any[] = []
  try {
    rawProducts = await fetchProducts()
  } catch (e) {
    console.error('Failed to fetch products:', e)
    rawProducts = []
  }

  const allProducts: GridProduct[] = rawProducts.map((p: any) => ({
    id: `${p.productId}-${p.slug}`,
    slug: p.slug,
    title: p.productTitle,
    description: p.productDescription,
    image: p.productImagesCollection?.items?.[0]?.url ?? '/traditional-indian-artifact.jpg',
    price: Number(p.productPrice) || 0,
    category: p.productCategory,
    vendor: p.vendor?.vendorName,
    bestSellers: p.bestSellers ?? false,
    featured: p.featured ?? false,
    productOrigin: p.productOrigin ?? ''
  }))

  return (
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
          <ProductsClient allProducts={allProducts} />
        </div>
      </section>
    </main>
  )
}
