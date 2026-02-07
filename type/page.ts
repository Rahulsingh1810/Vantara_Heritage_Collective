export type ProductImage = {
  title?: string
  description?: string
  url: string
  height?: number
  width?: number
}

export type Vendor = {
  vendorName?: string
  vendorLocation?: string
  vendorDescription?: string
}

export type Product = {
  slug: string
  productId: string
  productTitle: string
  productDescription?: string
  productImagesCollection?: {
    items: ProductImage[]
  }
  productCulturalSignificance: string
  productCategory: string
  productCare: string
  productStock: number
  vendor: Vendor
  productPrice: number
  productWeight: string
  productDimensions?: string
  productOrigin: string
  productMaterial: string
  placementsAndStylingNotes: string
  inYourSpace: string
}

export type ProductsCollection = {
  items: Product[]
}

export type PageItem = {
  productsCollection?: ProductsCollection
}

export type PageCollection = {
  items: PageItem[]
}

export type ProductsQueryResponse = {
  pageCollection?: PageCollection
}
