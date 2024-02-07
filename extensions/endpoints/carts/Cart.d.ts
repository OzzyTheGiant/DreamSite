import type { OrderItem } from "./Order"

export interface Cart {
  id: string
  products: OrderItem[]
  last_accessed: string
}
