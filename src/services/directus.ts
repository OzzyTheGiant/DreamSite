import { type Article } from '@/components/ArticleList.svelte'
import { createDirectus, rest, readItems, readItem } from '@directus/sdk'

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

    filter.translations = { languages_id: lang }
  } else {
    fields.push("title")
    fields.push("slug")
    fields.push("lead")
    fields.push("category.id", "category.name")
  }

  return (await client.request(readItems("articles", { fields }))) as Partial<Article>[]
}

// http://localhost:8055/items/articles/1?fields=*.*,category.translations.*
export async function fetchArticleByID(id: string | number): Promise<Article> {
  return (await client.request(
    readItem("articles", id, { fields: ["*.*", "category.translations.*"] })
  )) as Article
}