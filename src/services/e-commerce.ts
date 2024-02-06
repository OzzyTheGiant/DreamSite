import type { OrderItem } from "@/models/Order"
import type { ShippingRule } from "@/models/Product"

export function getProductFromCart(productID: number): OrderItem | undefined {
 // TODO: fetch product from cart
 return undefined
}

export function addProductToCart(orderItem: OrderItem, shippingRules: ShippingRule[]): void {
  // TODO: determine which shipping rule gets highest priority; this will become the one and only shipping rule
  // consider discussing with shop owner


  // TODO: save cart to Directus



  // TODO: store notification in sessionStorage to announce that product was added on the next page
  // this.$vToastify.success("Added product to cart")
}
