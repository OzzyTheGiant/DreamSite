export class Product {
  public id!: number
  public title!: string
  public url!: string
  public price_default!: number
  public description!: string
  public sold_alone?: boolean
  public shipping_rule!: ShippingRule
  public categories: ProductCategory[] = []
  public tags: ProductTag[] = []
  // TODO: set up correct models for these properties below
  public images: any[] = []
  public download_file?: any
  public variations?: ProductVariation[]
  public styles?: ProductStyle[]

  public constructor(data: Partial<Product>) {
    Object.assign(this, data)
  }

  public get pricing(): string {
    if (!this.variations && this.price_default) {
        return "$" + (this.price_default.toFixed(2) || "0.00")
    }

    return "$" + this.variations?.[0].price.toFixed(2) + " - $" +
        this.variations?.[this.variations.length - 1].price.toFixed(2)
  }
}

export interface ProductCategory {
  id: number
  name: string
}

export interface ProductTag {
  id: number
  name: string
}

// TODO: set up correct properties for variations and styles
export interface ProductVariation {
  id: number
  variation_type: string
  name: string
  price: number
}

export interface ProductStyle {
  id: number
  styles_name: string
  style_image: string
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
