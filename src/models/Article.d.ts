enum ArticleStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived"
}

export interface Article {
  id: number | string
  title: string
  slug: string
  status: ArticleStatus
  date_created: string
  date_updated: string
  directus_id?: number
  lead?: string
  isoDate?: string
  content?: string
  category: {
    id: number
    name: string
    translations: {
      id: number
      categories_id: number
      languages_code: string
      name: string
    }[] | number[]
  }
  author: {
    name: string
    first_name?: string
    last_name?: string
    title?: string // title must be "" if it needs to be hidden, otherwise, undefined will display
    profilePicture?: string // override visibility with css if needed
    href?: string // href required to display title on BlogTemplate
  },
  image: {
    title: string
    id: string
    filename_disk: string
  } | null,
  user_created: {
    first_name: string
    last_name: string
    title: string
  },
  user_updated: {
    first_name: string
    last_name: string
    title: string
  }
  translations: {
    id: number
    articles_id: number
    languages_id: string // language code
    title: string
    slug: string
    lead: string
    content: string
  }[]
}