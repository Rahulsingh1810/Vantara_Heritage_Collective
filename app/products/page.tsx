import type { Metadata } from "next"
import ProductFilters from "@/components/product-filters"
import ProductGrid from "@/components/product-grid"
import DiscountBanner from "@/components/discount-banner"
import DiscountClaimModal from "@/components/discount-claim-modal"
import fetchProducts from "@/utils/queries/page"   // adjust path to match your file name/location

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

  const cfProducts = await fetchProducts()

  // Basic filtering — extend as needed (client-side for now)
  const filtered = cfProducts.filter((p) => {
    let match = true

    if (params.category) {
      const cat = String(params.category).toLowerCase()
      match = match && (p.productCategory || "").toLowerCase() === cat
    }

    // Add more filters (vendor, price range, etc.) here when needed

    return match
  })

  // Derive filter options
  const uniqueCategories = Array.from(
    new Set(cfProducts.map((p) => p.productCategory).filter(Boolean))
  ).map((name) => ({ id: name, name }))

  const uniqueVendors = Array.from(
    new Set(cfProducts.map((p) => p.vendor?.vendorName).filter(Boolean))
  ).map((name) => ({ id: name, name }))

  // Map to shape expected by ProductGrid
  const productsForGrid = filtered.map((p) => ({
    id: p.productId || `temp-${Math.random().toString(36).slice(2, 10)}`,
    name: p.productTitle || "Unnamed Product",
    description: p.productDescription || "",
    image_url:
      p.productImagesCollection?.items?.[0]?.url ||
      "/traditional-indian-artifact.jpg",
    price: Number.parseFloat(String(p.productPrice || "0")) || 0,
    stock_quantity: 999, // placeholder — consider adding inventory field to Contentful
    category_id: p.productCategory || null,
    vendor_id: p.vendor?.vendorName || null,
    // Add any other fields your product card / grid needs
  }))

  return (
    <>
      <DiscountBanner />
      <DiscountClaimModal />

      <main>
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Our Collections</h1>
            <p className="mt-4 text-lg opacity-90">Discover authentic heritage pieces from master artisans</p>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-1">
                <ProductFilters categories={uniqueCategories} vendors={uniqueVendors} />
              </div>

              <div className="lg:col-span-4">
                {productsForGrid.length > 0 ? (
                  <ProductGrid products={productsForGrid} />
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-96 text-center">
                    <p className="text-lg text-muted-foreground mb-4">
                      No products found matching your filters.
                    </p>
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