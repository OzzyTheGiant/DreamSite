<Section name="blog">
  <BlogHead>
    <svelte:fragment slot="h2">{t("articles.title")}</svelte:fragment>
    <svelte:fragment slot="paragraph">
      <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
        {t("articles.description")}
      </p>
    </svelte:fragment>
  </BlogHead>
  <BlogBodyWrapper divClass="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each articles as article}
      <ArticleWrapper>
        <img class="mb-4" src="https://placehold.co/600x400" alt="placeholder"/>
        <ArticleHead>
          <span 
            class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
            <NewspaperSolid size="xs" class="mr-1" />
            {article.category}
          </span>
          <span class="text-sm">{article.isoDate}</span>
        </ArticleHead>
        <ArticleBody>
          <svelte:fragment slot="h2"><a href="/">{article.title}</a></svelte:fragment>
          <svelte:fragment slot="paragraph">
            <p class="mb-5 font-light text-gray-500 dark:text-gray-400">{article.lead}</p>
          </svelte:fragment>
        </ArticleBody>
        <ArticleAuthor>
          <svelte:fragment slot="author">
            <img 
              class="w-7 h-7 rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
              alt={article.author.name} />
            <span class="font-medium dark:text-white">{article.author.name}</span>
          </svelte:fragment>
          <a 
            href={t("header.articles.link") + "/" + article.id} 
            class="inline-flex items-center font-medium text-primary-600 dark:text-primary-200 hover:underline">
            {t("common.read_more")}
            <ArrowRightOutline size="sm" class="ml-2" />
          </a>
        </ArticleAuthor>
      </ArticleWrapper>
    {/each}
  </BlogBodyWrapper>
</Section>

<script lang="ts">
import i18next, { t } from "i18next"
import Section from "flowbite-svelte-blocks/Section.svelte"
import ArticleAuthor from "flowbite-svelte-blocks/blog/ArticleAuthor.svelte"
import ArticleBody from "flowbite-svelte-blocks/blog/ArticleBody.svelte"
import ArticleHead from "flowbite-svelte-blocks/blog/ArticleHead.svelte"
import ArticleWrapper from "flowbite-svelte-blocks/blog/ArticleWrapper.svelte"
import BlogHead from "flowbite-svelte-blocks/blog/BlogHead.svelte"
import BlogBodyWrapper from "flowbite-svelte-blocks/blog/BlogBodyWrapper.svelte"
import ArrowRightOutline from "flowbite-svelte-icons/ArrowRightOutline.svelte"
import NewspaperSolid from "flowbite-svelte-icons/NewspaperSolid.svelte"

export let articles: Article[]
</script>

<script lang="ts" context="module">
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
    lead: string
    content: string
  }[]
}
</script>