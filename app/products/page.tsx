import type { Metadata } from "next"
import { sql } from "@/lib/db"
import ProductFilters from "@/components/product-filters"
import ProductGrid from "@/components/product-grid"
import DiscountBanner from "@/components/discount-banner"
import DiscountClaimModal from "@/components/discount-claim-modal"

export const metadata: Metadata = {
  title: "Products - The Heritage Collective",
  description: "Browse our collection of traditional artifacts and heritage pieces from artisans worldwide.",
}

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams

  // Get filters from query params
  const categoryId = params.category ? Number.parseInt(params.category as string) : undefined
  const vendorId = params.vendor ? Number.parseInt(params.vendor as string) : undefined
  const minPrice = params.minPrice ? Number.parseFloat(params.minPrice as string) : undefined
  const maxPrice = params.maxPrice ? Number.parseFloat(params.maxPrice as string) : undefined

  const [categories, vendors, products] = await Promise.all([
    sql`SELECT * FROM categories ORDER BY name`,
    sql`SELECT * FROM vendors ORDER BY name`,
    buildProductQuery(categoryId, vendorId, minPrice, maxPrice),
  ])

  return (
    <>
      <DiscountBanner />
      <DiscountClaimModal />
      <main>
        {/* Page Header */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Our Collections</h1>
            <p className="mt-4 text-lg opacity-90">Discover authentic heritage pieces from master artisans</p>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Filters - Wider on desktop */}
              <div className="lg:col-span-1">
                <ProductFilters categories={categories} vendors={vendors} />
              </div>

              {/* Product Grid - Takes more space */}
              <div className="lg:col-span-4">
                {products.length > 0 ? (
                  <ProductGrid products={products} />
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-96 text-center">
                    <p className="text-lg text-muted-foreground mb-4">No products found matching your filters.</p>
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

async function buildProductQuery(categoryId?: number, vendorId?: number, minPrice?: number, maxPrice?: number) {
  if (categoryId && vendorId && minPrice !== undefined && maxPrice !== undefined) {
    return sql`SELECT * FROM products WHERE category_id = ${categoryId} AND vendor_id = ${vendorId} AND price >= ${minPrice} AND price <= ${maxPrice} ORDER BY created_at DESC`
  }
  if (categoryId && vendorId && minPrice !== undefined) {
    return sql`SELECT * FROM products WHERE category_id = ${categoryId} AND vendor_id = ${vendorId} AND price >= ${minPrice} ORDER BY created_at DESC`
  }
  if (categoryId && vendorId && maxPrice !== undefined) {
    return sql`SELECT * FROM products WHERE category_id = ${categoryId} AND vendor_id = ${vendorId} AND price <= ${maxPrice} ORDER BY created_at DESC`
  }
  if (categoryId && vendorId) {
    return sql`SELECT * FROM products WHERE category_id = ${categoryId} AND vendor_id = ${vendorId} ORDER BY created_at DESC`
  }
  if (categoryId && minPrice !== undefined && maxPrice !== undefined) {
    return sql`SELECT * FROM products WHERE category_id = ${categoryId} AND price >= ${minPrice} AND price <= ${maxPrice} ORDER BY created_at DESC`
  }
  if (categoryId && minPrice !== undefined) {
    return sql`SELECT * FROM products WHERE category_id = ${categoryId} AND price >= ${minPrice} ORDER BY created_at DESC`
  }
  if (categoryId && maxPrice !== undefined) {
    return sql`SELECT * FROM products WHERE category_id = ${categoryId} AND price <= ${maxPrice} ORDER BY created_at DESC`
  }
  if (categoryId) {
    return sql`SELECT * FROM products WHERE category_id = ${categoryId} ORDER BY created_at DESC`
  }
  if (vendorId && minPrice !== undefined && maxPrice !== undefined) {
    return sql`SELECT * FROM products WHERE vendor_id = ${vendorId} AND price >= ${minPrice} AND price <= ${maxPrice} ORDER BY created_at DESC`
  }
  if (vendorId && minPrice !== undefined) {
    return sql`SELECT * FROM products WHERE vendor_id = ${vendorId} AND price >= ${minPrice} ORDER BY created_at DESC`
  }
  if (vendorId && maxPrice !== undefined) {
    return sql`SELECT * FROM products WHERE vendor_id = ${vendorId} AND price <= ${maxPrice} ORDER BY created_at DESC`
  }
  if (vendorId) {
    return sql`SELECT * FROM products WHERE vendor_id = ${vendorId} ORDER BY created_at DESC`
  }
  if (minPrice !== undefined && maxPrice !== undefined) {
    return sql`SELECT * FROM products WHERE price >= ${minPrice} AND price <= ${maxPrice} ORDER BY created_at DESC`
  }
  if (minPrice !== undefined) {
    return sql`SELECT * FROM products WHERE price >= ${minPrice} ORDER BY created_at DESC`
  }
  if (maxPrice !== undefined) {
    return sql`SELECT * FROM products WHERE price <= ${maxPrice} ORDER BY created_at DESC`
  }
  return sql`SELECT * FROM products ORDER BY created_at DESC`
}
