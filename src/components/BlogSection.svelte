<Section name="blog">
  <BlogHead>
    <svelte:fragment slot="h2">{title}</svelte:fragment>
    <svelte:fragment slot="paragraph">
      <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">{description}</p>
    </svelte:fragment>
  </BlogHead>
  <BlogBodyWrapper>
    {#each posts as post}
      <ArticleWrapper>
        <ArticleHead>
          <span class="category-badge">
            <NewspaperSolid size="xs" class="mr-1"/>
            {post.category}
          </span>
          <span class="text-sm dark:text-gray-400">
            {new Date(post.date).toLocaleDateString()}
          </span>
        </ArticleHead>
        <ArticleBody>
          <svelte:fragment slot="h2"><a href="/">{post.title}</a></svelte:fragment>
          <svelte:fragment slot="paragraph">
            <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
              {post.description}
            </p>
          </svelte:fragment>
        </ArticleBody>
        <ArticleAuthor>
          <svelte:fragment slot="author">
            <img 
              class="w-7 h-7 rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" 
              alt={post.author}/>
            <span class="font-medium dark:text-white">{post.author}</span>
          </svelte:fragment>
          <a href="/" class="post-link">
            {linkText}<ArrowRightOutline size="sm" class="ml-2" />
          </a>
        </ArticleAuthor>
      </ArticleWrapper>
    {/each}
  </BlogBodyWrapper>
</Section>

<script lang="ts">
import Section from "flowbite-svelte-blocks/Section.svelte"
import ArticleAuthor from "flowbite-svelte-blocks/blog/ArticleAuthor.svelte"
import ArticleBody from "flowbite-svelte-blocks/blog/ArticleBody.svelte"
import ArticleHead from "flowbite-svelte-blocks/blog/ArticleHead.svelte"
import ArticleWrapper from "flowbite-svelte-blocks/blog/ArticleWrapper.svelte"
import BlogHead from "flowbite-svelte-blocks/blog/BlogHead.svelte"
import BlogBodyWrapper from "flowbite-svelte-blocks/blog/BlogBodyWrapper.svelte"
import NewspaperSolid from "flowbite-svelte-icons/NewspaperSolid.svelte"
import ArrowRightOutline from "flowbite-svelte-icons/ArrowRightOutline.svelte"

interface Post {
  title: string
  description: string
  author: string
  date: string
  category: string
}

export let title: string
export let description: string
export let linkText: string
export let posts: Post[]

/* Usage:
<BlogSection
  title="Our Blog"
  description="This is our blog"
  linkText="Read More"
  posts={posts}/>
*/
</script>

<style lang="postcss">
.category-badge {
  @apply bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center;
  @apply px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800;
}

.post-link {
  @apply inline-flex items-center font-medium text-primary-600 dark:text-primary-200;
  @apply hover:underline;
}
</style>
