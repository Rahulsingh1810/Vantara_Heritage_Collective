import { IMedia } from './media'
import { IVendor } from './vendor'

export interface IProduct {
  productId: number | string
  productTitle: string
  productDescription: string
  slug: string
  productCulturalSignificance?: string
  productCategory: string
  productCare?: string
  vendor?: IVendor
  productPrice: number
  productStock: number
  productWeight?: number
  productDimensions?: string
  productOrigin?: string
  productMaterial?: string
  productImagesCollection?: IMedia[]
  placementsAndStylingNotes?: string
  inYourSpace?: string
}