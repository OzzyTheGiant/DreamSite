export class Product {
  public id!: number
  public title!: string
  public url!: string
  public price_default!: number
  public description!: string
  public sold_alone?: boolean
  public shipping_rule!: ShippingRule
  public variations: ProductVariation[] = []
  public styles: ProductStyle[] = []
  public categories: ProductCategory[] = []
  public tags: ProductTag[] = []
  public images: PublicFile[] = []
  public download_file: PublicFile | null = null

  /** 
   *  @param {Partial<Product>} data - The raw JSON data from API fetch
   *  @param {boolean} recreate - On the first initialization, JSON data must be reorganized, so
   * this parameter is to skip the reorganization since the searched propertied will no longer
   * exist. This process is necessary because Astro for some reason removes class typing from
   * injected props after compilation
  */
  public constructor(data: Partial<Product>, recreate = false) {
    Object.assign(this, data)
    if (!recreate) this.enforceDataStructure()
  }

  public get pricing(): string {
    if (!this.variations && this.price_default) {
        return "$" + (this.price_default.toFixed(2) || "0.00")
    }

    return "$" + this.variations?.[0].price.toFixed(2) + " - $" +
        this.variations?.[this.variations.length - 1].price.toFixed(2)
  }

  public getVariationPrice(selectedVariation?: ProductVariation): string {
    if (!this.variations.length && this.price_default) {
        return "$" + this.price_default.toFixed(2)
    } else if (!this.variations.length) {
        return "$0.00"
    }

    if (!selectedVariation) {
        return "$" + this.variations[0].price.toFixed(2) + " - $" +
            this.variations[this.variations.length - 1].price.toFixed(2)
    }

    return "$" + (selectedVariation?.price.toFixed(2) ?? "0.00")
  }

  /** This is to reorganize data after fetching from API */
  public enforceDataStructure(): void {
    this.categories = this.categories.map(cat => (cat as any).product_categories_id)
    this.tags = this.tags.map(tag => (tag as any).product_tags_id)
    this.images = this.images.map(image => (image as any).directus_files_id)
  }
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
