import { type Article } from '@/components/ArticleList.svelte'
import { createDirectus, rest, readItems, readItem } from '@directus/sdk'

const client = createDirectus(import.meta.env.PUBLIC_URL).with(rest())

export type ArticleList = {
  id: number
  slug: string
  translations: {
    languages_id: string
    slug: string
  }[]
}[]

// http://localhost:8055/items/articles?fields=id,slug,translations.languages_id,translations.slug
export async function fetchArticleIDs(): Promise<ArticleList> {
  return (await client.request(
    readItems("articles", { 
      fields: ["id", "slug", "translations.languages_id", "translations.slug"] 
    })
  )) as ArticleList
}

// http://localhost:8055/items/articles/1?fields=*.*,category.translations.*
export async function fetchArticleByID(id: string | number): Promise<Article> {
  return (await client.request(
    readItem("articles", id, { fields: ["*.*", "category.translations.*"] })
  )) as Article
}