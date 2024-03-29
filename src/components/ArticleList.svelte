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
        <img class="mb-4" src={article.image?.filename_disk} alt={article.image?.title}/>
        <ArticleHead>
          <span 
            class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
            <NewspaperSolid size="xs" class="mr-1" />
            {article.category?.name}
          </span>
          <span class="text-sm">{article.date_created}</span>
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
              alt={article.author?.name} />
            <span class="font-medium dark:text-white">
              {article.author?.first_name} {article.author?.last_name}
            </span>
          </svelte:fragment>
          <a 
            href={t("header.articles.link") + "/" + article.id + "/" + article.slug} 
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
import { t } from "i18next"
import Section from "flowbite-svelte-blocks/Section.svelte"
import ArticleAuthor from "flowbite-svelte-blocks/blog/ArticleAuthor.svelte"
import ArticleBody from "flowbite-svelte-blocks/blog/ArticleBody.svelte"
import ArticleHead from "flowbite-svelte-blocks/blog/ArticleHead.svelte"
import ArticleWrapper from "flowbite-svelte-blocks/blog/ArticleWrapper.svelte"
import BlogHead from "flowbite-svelte-blocks/blog/BlogHead.svelte"
import BlogBodyWrapper from "flowbite-svelte-blocks/blog/BlogBodyWrapper.svelte"
import ArrowRightOutline from "flowbite-svelte-icons/ArrowRightOutline.svelte"
import NewspaperSolid from "flowbite-svelte-icons/NewspaperSolid.svelte"
import type { Article } from "@/models/Article"

export let articles: Partial<Article>[]
</script>