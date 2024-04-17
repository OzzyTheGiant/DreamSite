export interface OrderItem {
  id?: string
  order?: string
  product_id: number,
  product: string
  quantity: number
  variation?: string
  style?: string
  price: number
  product_url?: string
  date_created?: string
  date_updated?: string
}
