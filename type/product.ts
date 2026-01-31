import { IMedia } from './media'
import { IVendor } from './vendor'

export type IProducts = {
  productId: number
  productTitle: string
  productDescription: string
  slug?: string //this was not there added just now
  productCulturalSignificance: string
  productCategory: string
  productCare: string
  vendor: IVendor
  productPrice: number
  productWeight: number
  productDimensions: string
  productOrigin: string
  productStock: number
  productMaterial: string
  
  productImagesCollection: IMedia[]
}
