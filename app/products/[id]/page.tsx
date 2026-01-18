// app/products/[id]/page.tsx   ← folder stays [id]

import { notFound } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Star } from "lucide-react"
import type { Metadata } from "next"
import AddToCartButton from "@/components/add-to-cart-button"
import ProductImageGallery from "@/components/product-image-gallery"
import ProductDetailsSection from "@/components/product-details-section"
import fetchProductByProductId from "@/utils/queries/slugpage"   // ← adjust path

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = await fetchProductByProductId(id)

  return {
    title: product
      ? `${product.productTitle} - The Heritage Collective`
      : "Product Not Found",
    description: product?.productDescription?.substring(0, 160) || "",
  }
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const cfProduct = await fetchProductByProductId(id)

  if (!cfProduct) {
    notFound()
  }

  // Map to shape your components expect
  const product = {
    id: cfProduct.productId || id,  // use the URL id as fallback
    name: cfProduct.productTitle || "Unnamed Product",
    description: cfProduct.productDescription || "",
    image_url:
      cfProduct.productImagesCollection?.items?.[0]?.url ||
      "/traditional-indian-artifact.jpg",
    price: Number.parseFloat(String(cfProduct.productPrice || "0")) || 0,
    stock_quantity: 999,           // ← placeholder – add real field later
    // add more fields if needed by AddToCartButton, etc.
  }

  const vendor = cfProduct.vendor || {
    vendorName: "Heritage Artisan",
    vendorDescription: "",
    vendorLocation: "India",
  }

  const primaryImage = product.image_url

  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="py-20 text-center">Loading product details...</div>}>
        {/* Breadcrumb */}
        <div className="bg-card border-b border-border sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/products"
              className="flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
          </div>
        </div>

        <section className="py-8 md:py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="animate-slide-in-left">
                <ProductImageGallery
                  primaryImage={primaryImage}
                  productName={product.name}
                />
              </div>

              <div className="flex flex-col animate-fade-in-up space-y-6">
                <div className="flex items-center gap-4">
                  <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full">
                    {cfProduct.productCategory || "Artifact"}
                  </span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">(42 reviews)</span>
                  </div>
                </div>

                <div>
                  <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-lg text-muted-foreground">{product.description}</p>
                </div>

                {vendor && (
                  <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                    <p className="text-sm text-muted-foreground mb-1">Crafted by</p>
                    <h3 className="text-xl font-bold text-foreground mb-2">{vendor.vendorName}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{vendor.vendorDescription}</p>
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                        {vendor.vendorLocation || "Artisan from India"}
                      </p>
                    </div>
                  </div>
                )}

                <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-8 border border-primary/20">
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-5xl font-bold text-primary">${product.price.toFixed(2)}</span>
                    <span
                      className={`text-lg font-semibold px-3 py-1 rounded-full ${
                        product.stock_quantity > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : "Out of stock"}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <AddToCartButton
                      product={product}
                      disabled={product.stock_quantity === 0}
                      className="w-full py-3 px-6 text-lg"
                    />

                    {product.stock_quantity === 0 && (
                      <p className="text-sm text-muted-foreground text-center p-4 bg-muted rounded-lg">
                        This item is currently out of stock. Please check back soon or inquire for custom orders.
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card p-4 rounded-lg border border-border text-center">
                    <p className="text-2xl mb-1">✓</p>
                    <p className="text-xs font-semibold text-primary uppercase">Authentic</p>
                    <p className="text-xs text-muted-foreground">Verified Original</p>
                  </div>
                  <div className="bg-card p-4 rounded-lg border border-border text-center">
                    <p className="text-2xl mb-1">🚚</p>
                    <p className="text-xs font-semibold text-primary uppercase">Secure Shipping</p>
                    <p className="text-xs text-muted-foreground">Insured Delivery</p>
                  </div>
                </div>
              </div>
            </div>

            <ProductDetailsSection
              category={cfProduct.productCategory}
              material={cfProduct.productCare || "Traditional Handcrafted"}
              cultureSignificance={cfProduct.productCulturalSignificance || ""}
              careInstructions={cfProduct.productCare || ""}
            />
          </div>
        </section>

        <section className="py-16 md:py-24 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Discover More Treasures</h2>
            <p className="text-muted-foreground mb-12">Explore our curated collection of authentic Indian artifacts</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border border-primary/20 flex flex-col items-center justify-center text-center min-h-64">
                <p className="text-4xl mb-4">🎨</p>
                <p className="text-muted-foreground">More items from this collection coming soon...</p>
              </div>
            </div>
          </div>
        </section>
      </Suspense>
    </main>
  )
}