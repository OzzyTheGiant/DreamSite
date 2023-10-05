<Section name={image ? "contentwithimg" : "content"}>
  {#if buttonLink && buttonText}
    <Content>
      <svelte:fragment slot="h2">{title}</svelte:fragment>
      <slot/>
      <a href={buttonLink} class="link">
        {buttonText}
        <ChevronRightSolid class="ml-2" size="xs"/>
      </a>
    </Content>
  {:else if image && imageAlt}
    <ContentWithImage>
      <svelte:fragment slot="h2">{title}</svelte:fragment>
      <slot/>
      <svelte:fragment slot="image">
        <img class="w-full rounded-lg" src={image} alt={imageAlt}/>
        <img
        class="mt-4 w-full lg:mt-10 rounded-lg"
        src={image2}
        alt={image2Alt}/>
      </svelte:fragment>
    </ContentWithImage>
  {/if}
</Section>

<script lang="ts">
import Section from "flowbite-svelte-blocks/Section.svelte"
import Content from "flowbite-svelte-blocks/content/Content.svelte"
import ContentWithImage from "flowbite-svelte-blocks/content/ContentWithImage.svelte"
import ChevronRightSolid from "flowbite-svelte-icons/ChevronRightSolid.svelte"

export let title: string
export let image: string | undefined = undefined
export let imageAlt: string | undefined = undefined
export let image2: string | undefined = undefined
export let image2Alt: string | undefined = undefined
export let buttonText: string | undefined = undefined
export let buttonLink: string | undefined = undefined

/* Usage:
<ContentSection
  title="Sample Title"
  image="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
  imageAlt="office content 1"
  image2="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
  image2Alt="office content 2">
  <p class="mb-4">Sample content</p>
</ContentSection>

-- or --

<ContentSection
    title="Sample Title"
    buttonText="Learn More"
    buttonLink="/services">
    <p class="mb-4">Sample content</p>
  </ContentSection>
*/
</script>

<style lang="postcss">
.link {
  @apply inline-flex items-center font-bold text-primary-600 hover:text-primary-800;
  @apply dark:text-primary-300 dark:hover:text-primary-500;
}
</style>
