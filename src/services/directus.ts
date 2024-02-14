import { createDirectus, rest, readItems, readItem, createItem } from '@directus/sdk'
import { type Article } from '@/models/Article.d'
import { type Comment } from '@/models/Comment.d'
import type { OrderItem } from '@/models/Order'
import { Product, type ShippingRule } from '@/models/Product'

interface CartResponseData {
  cart?: OrderItem[]
  message: string
}

const BASE_URL = import.meta.env.PUBLIC_APP_URL
const client = createDirectus(import.meta.env.PUBLIC_URL).with(rest())

// http://localhost:8055/items/articles?fields=id,date_created,title,slug,lead,author.*,image.*,category.id,category.name
// http://localhost:8055/items/articles?fields=id,date_created,author.*,image.*,category.*.*,translations.languages_id,translations.title,translations.slug,translations.lead&filter[translations][languages_id][_starts_with]=es
export async function fetchArticleList(lang?: string): Promise<Partial<Article>[]> {
  const fields = ["id", "date_created", "author.*", "image.*"]
  let filter: { [key: string]: any } = {}

  if (lang && lang !== "en") {
    fields.push("translations.languages_id")
    fields.push("translations.title")
    fields.push("translations.slug")
    fields.push("translations.lead")
    fields.push("category.*.*")

    filter.translations = { languages_id: { _starts_with: lang } }
  } else {
    fields.push("title")
    fields.push("slug")
    fields.push("lead")
    fields.push("category.id", "category.name")
  }

  return (await client.request(readItems("articles", { fields, filter }))) as Partial<Article>[]
}

// http://localhost:8055/items/articles/1?fields=*.*,category.translations.*
export async function fetchArticleByID(id: string | number): Promise<Article> {
  return (await client.request(
    readItem("articles", id, { fields: ["*.*", "category.translations.*"] })
  )) as Article
}

export async function fetchCommentsByArticleID(id: string | number): Promise<Comment[]> {
  return (await client.request(
    readItems("comments", { filter: { article: id } })
  )) as Comment[]
}

export async function submitArticleComment(data: Comment): Promise<any> {
  return (await client.request(createItem("comments", data)))
}

/* E-Commerce */

// http://localhost:8055/items/products?fields=id,date_created,date_updated,title,url,description,variations,styles,images.directus_files_id,images.directus_files_id.*,categories.product_categories_id.name,tags.product_tags_id.name,shipping_rules.shipping_rules_id.*
// http://localhost:8055/items/products?fields=id,date_created,date_updated,styles,translations.*,images.directus_files_id,images.directus_files_id.*,categories.product_categories_id.translations.*,tags.product_tags_id.translations.*,shipping_rules.shipping_rules_id.*&filter[translations][languages_code][_starts_with]=es&filter[categories][product_categories_id][translations][languages_code][_starts_with]=es&filter[tags][product_tags_id][translations][languages_code][_starts_with]=es
export async function fetchProductList(
  lang?: string,
  category?: number,
  limit = -1,
  exclude?: number
): Promise<Product[]> {
  const fields = [
    "id",
    "date_created",
    "date_updated",
    "price_default",
    "styles",
    "images.directus_files_id",
    "images.directus_files_id.*"
  ]

  let filter: { [key: string]: any } = {}

  if (category) filter.categories = { id: { _eq: category } }
  if (exclude) filter.id = { _neq: exclude }

  if (lang && lang !== "en") {
    fields.push("translations.*")
    fields.push("categories.product_categories_id.translations.*")
    fields.push("tags.product_tags_id.translations.*")

    filter.translations = { languages_code: { _starts_with: lang } }

    filter.categories = { 
      product_categories_id: { 
        translations: { 
          languages_code: { _starts_with: lang }
        }
      }
    }

    filter.tags = { 
      product_tags_id: { 
        translations: { 
          languages_code: { _starts_with: lang }
        }
      }
    }
  } else {
    fields.push("title")
    fields.push("url")
    fields.push("description")
    fields.push("variations")
    fields.push("categories.product_categories_id.name")
    fields.push("tags.product_tags_id.name")
  }

  return (await client.request(readItems("products", { fields, limit, filter }))).map(
    data => new Product(data)
  )
}

// http://localhost:8055/items/products/1?fields=*.*,images.directus_files_id.*,categories.product_categories_id.name,categories.product_categories_id.translations.*,tags.product_tags_id.name,tags.product_tags_id.translations.*,shipping_rules.shipping_rules_id.*
export async function fetchProductByID(id: number | string): Promise<Product> {
  return new Product(await client.request(
    readItem("products", id, { fields: [
      "*.*",
      "images.directus_files_id.*",
      "categories.product_categories_id.name",
      "categories.product_categories_id.translations.*",
      "tags.product_tags_id.name",
      "tags.product_tags_id.translations.*",
      "shipping_rules.shipping_rules_id.*"
    ]})
  ))
}

export async function fetchCart(): Promise<CartResponseData> {
  try {
    const response = await fetch(BASE_URL + "/carts")
    return (await response.json() as CartResponseData)
  } catch (error: any) {
    console.error(error)
    return { cart: [], message: "Server Error: Could not fetch cart" }
  }  
}

export async function updateCartProductList(orderItem: OrderItem): Promise<CartResponseData> {
  try {
    const response = await fetch(BASE_URL + "/carts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderItem)
    })

    return (await response.json()) as CartResponseData
  } catch (error: any) {
    console.error(error)
    return { cart: [], message: error.message }
  }
}

export async function deleteCartProduct(orderItem: OrderItem): Promise<CartResponseData> {
  try {
    const response = await fetch(BASE_URL + "/carts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderItem)
    })

    if (!response.ok) throw new Error("product_removal_failed")
    return (await response.json()) as CartResponseData
  } catch (error: any) {
    console.error(error)
    return { cart: [], message: error.message }
  }
}
