import type { OrderItem } from "@/models/Order"
import { fetchCart, updateCartProductList } from "@/services/directus"
import { warning, info } from "@/store/notification"

export async function getProductFromCart(
  productID: number,
  t: { [key: string]: string }
): Promise<OrderItem | undefined> {
 const { cart, message } = await fetchCart()

 if (message) warning(t[message] ?? message)

 return cart?.find(item => item.product_id === productID)
}

export async function updateCartProduct(
  orderItem: OrderItem,
  t: { [key: string]: string }
): Promise<string | void> {
  const response = await updateCartProductList(orderItem)
  const storageKey = "dreamsite.notification"

  if (response.message === "product_not_found") {
    const notification = { type: "error", message: t["product_unavailable"] }
    sessionStorage.setItem(storageKey, JSON.stringify(notification))
    return window.location.assign("/shop")
  }

  if (response.message === "variant_not_found") {
    info(t["variant_unavailable"])
    return response.message
  }

  const notification = { type: "success", message: t["added_product_to_cart"] }
  sessionStorage.setItem(storageKey, JSON.stringify(notification))
}
