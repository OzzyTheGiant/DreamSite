import type { ShippingRule } from "@/models/Product"
import { deleteCartProduct } from "@/services/directus"
import { success, error } from "@/store/notification"

export interface OrderItem {
  id?: string
  order?: string
  product_id?: number,
  product: string
  quantity: number
  variation?: string
  style?: string
  price: number
  product_url?: string
  date_created?: string
  date_updated?: string
  shipping_rule: ShippingRule
}

export default class Order {
  id?: string
  cart: OrderItem[] = []

  public get subtotal(): number {
    return this.cart.reduce((acc, item) => acc + item.price, 0)
  }

  public constructor(cart: OrderItem[]) {
    this.cart = cart
  }

  public calculateTaxes(state: string): number {
    if (state === import.meta.env.PUBLIC_SALES_TAX_STATE) {
      return this.cart.reduce((tax, item) => item.price * import.meta.env.PUBLIC_SALES_TAX_RATE, 0)
    }

    return 0
  }

  public async removeCartProduct(
    orderItem: OrderItem,
    t: { [key: string]: string }
  ): Promise<OrderItem[]> {
    const response = await deleteCartProduct(orderItem)
  
    if (!response.cart) error(t[response.message])
    else {
      this.cart = response.cart
      success(t[response.message])
    }

    return this.cart
  }
}