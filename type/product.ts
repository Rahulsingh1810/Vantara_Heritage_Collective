import { IMedia } from "./media"
import { IVendor } from "./vendor"

export type IProducts = {
          productId: Number,
          productTitle : string,
          productDescription : string,
          slug ?: string, //this was not there added just now
          productCulturalSignificance : string,
          productCategory : string,
          productCare : string,
          vendor : IVendor,
          productPrice : Number,
          productWeight : Number,
          productDimensions : string,
          productOrigin : string,
          productMaterial : string,
          productImagesCollection : IMedia[]
          

}