import { writable, derived } from "svelte/store"
import type { OrderItem } from "@/models/Order"
import { deleteCartProduct, fetchCart, updateCartProductList } from "@/services/directus"
import { error, info, success, warning } from "@/store/notification"

export const cart = writable<OrderItem[]>([])

export const subtotal = derived(
  cart, 
  ($cart: OrderItem[]) => $cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
)

export function getTotalQuantity(cart: OrderItem[]): number {
  return cart.reduce((acc, item) => acc + item.quantity, 0)
}

export function calculateTaxes(state: string, cart: OrderItem[]): number {
  if (state === import.meta.env.PUBLIC_SALES_TAX_STATE) {
    return cart.reduce(
      (tax, item) => item.price * import.meta.env.PUBLIC_SALES_TAX_RATE + tax, 0
    )
  }

  return 0
}

export function loadCartProductCount(): number {
  const value = localStorage.getItem("dreamsite.cart-count")
  return value ? parseInt(value) : 0
}

export async function loadCart(): Promise<void> {
  const cartData = (await fetchCart()).cart ?? []
  cart.set(cartData)
  localStorage.setItem("dreamsite.cart-count", getTotalQuantity(cartData).toString())
}

export function getCartProductCount(): number {
  const value = localStorage.getItem("dreamsite.cart-count")
  return value ? parseInt(value) : 0
}

export async function getProductFromCart(
  productID: number,
  t: { [key: string]: string }
): Promise<OrderItem | undefined> {
  const { cart: cartData, message } = await fetchCart()

  if (message) warning(t[message] ?? message)
  if (cartData) {
    cart.set(cartData)
    localStorage.setItem("dreamsite.cart-count", getTotalQuantity(cartData).toString())
  }

  return cartData?.find(item => item.product_id === productID)
}

export async function updateCart(
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

  if (response.cart) {
    // no need to change cart data in store, as this function should trigger navigation
    localStorage.setItem("dreamsite.cart-count", getTotalQuantity(response.cart).toString())
  }

  sessionStorage.setItem(storageKey, JSON.stringify(notification))
}

export async function removeProductFromCart(
  orderItem: OrderItem,
  t: { [key: string]: string }
): Promise<void> {
  const response = await deleteCartProduct(orderItem)

  if (!response.cart) error(t[response.message])
  else {
    cart.set(response.cart)
    localStorage.setItem("dreamsite.cart-count", getTotalQuantity(response.cart).toString())
    success(t[response.message])
  }
}

