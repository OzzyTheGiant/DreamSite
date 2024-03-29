<Section name={sectionType}>
  {#if sectionType === "heroVisual"}
  <div class="mr-auto place-self-center lg:col-span-7">
    <HeroHeader h1Class={h1Class} pClass={pClass}>

      <svelte:fragment slot="h1">{title}</svelte:fragment>
      <svelte:fragment slot="paragraph">
        <span class="text-2xl text-gray-500 dark:text-gray-400">{description}</span>
      </svelte:fragment>

      <Button 
        size="xl" 
        color="primary" 
        class="inline-flex items-center justify-center mr-3 mb-2"
        href={primaryButtonLink}>
        {primaryButtonText}<FileInvoiceSolid size="md" class="ml-2 -mr-1" />
      </Button>

      <Button 
        size="xl" 
        class="inline-flex items-center justify-center neutral mb-2"
        href={secondaryButtonLink}>
        {secondaryButtonText}
      </Button>
    </HeroHeader>
  </div>
  <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
    <img src={image} alt={imageAlt}/>
  </div>
  {:else if sectionType === "heroDefault"}
    <HeroHeader>
      <svelte:fragment slot="h1">{title}</svelte:fragment>
      <svelte:fragment slot="paragraph">
        <span class="text-2xl">{description}</span>
      </svelte:fragment>
    </HeroHeader>

    <div class="button-group">
      <a href={primaryButtonLink} class="mb-2">
        <Button size="lg" color="primary">
          {primaryButtonText}<FileInvoiceSolid size="md" class="ml-2 -mr-1"/>
        </Button>
      </a>
      <a href={secondaryButtonLink} class="mb-2">
        <Button size="lg" class="neutral">{secondaryButtonText}</Button>
      </a>
    </div>
  {/if}
</Section>

<script lang="ts">
import Section from "flowbite-svelte-blocks/Section.svelte"
import HeroHeader from "flowbite-svelte-blocks/hero/HeroHeader.svelte"
import Button from "flowbite-svelte/Button.svelte"
import FileInvoiceSolid from "flowbite-svelte-icons/FileInvoiceSolid.svelte"

export let sectionType: Section["name"]
export let title: string
export let description: string
export let image: string | undefined = undefined
export let imageAlt: string | undefined = undefined
export let primaryButtonText: string
export let secondaryButtonText: string
export let primaryButtonLink: string = "/"
export let secondaryButtonLink: string = "/"

const h1Class = `
  text-4xl font-extrabold tracking-tight leading-none max-w-2xl mb-4 md:text-5xl 
  xl:text-6xl  dark:text-white
`

const pClass = `
  max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl
`
</script>

<style global lang="postcss">
.button-group {
  @apply flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row;
  @apply sm:justify-center sm:space-y-0 sm:space-x-4;
}

.neutral {
  @apply bg-neutral-500 hover:bg-neutral-600 focus:ring-neutral-300  text-white;
}
</style>
