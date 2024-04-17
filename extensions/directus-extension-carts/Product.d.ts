export interface Product {
  id: number
  title: string
  url: string
  price_default: number
  description: string
  sold_alone?: boolean
  variations: ProductVariation[]
  styles: ProductStyle[]
  shipping_rules: ShippingRule[]
  categories: ProductCategory[]
  tags: ProductTag[]
  images: PublicFile[]
  download_file: PublicFile | null
}

export interface ProductCategory {
  id?: number
  name: string
}

export interface ProductTag {
  id?: number
  name: string
}

export interface ProductVariation {
  variation_name: string
  price: number
}

export interface ProductStyle {
  style_name: string
}

export interface PublicFile {
  id: string
  title: string
  filename_disk: string
  width: number | null
  height: number | null
}

export interface ShippingRule {
  id: number
  rule_name: string
  /** The price for shipping a Product with this rule  */
  rate: number
  /** same as `rate` but for priority shipping */
  priority_rate: number
  /** The amount of the subtotal at which the discount is applied */
  price_threshold: number
  /** The number of items at which the discount is applied */
  item_threshold: number
  /** a percentage that is discounted from the subtotal */
  discount_amount: number
}
