<Section name="portfolio" sectionClass="antialiased">
  <Portfolio 
    {title} 
    subtitleClass="text-gray-600 text-gray-500 sm:text-xl mt-4 dark:text-gray-400"
    subtitle={description}>
    {#each items as item}
      <PortfolioItem 
        {linkClass} 
        {item} 
        descriptionClass="text-gray-600 text-lg dark:text-gray-400"/>
    {/each}
  </Portfolio>
</Section>

<script lang="ts">
import Section from "flowbite-svelte-blocks/Section.svelte"
import Portfolio from "flowbite-svelte-blocks/portfolio/Portfolio.svelte"
import PortfolioItem from "flowbite-svelte-blocks/portfolio/PortfolioItem.svelte"

export let title: string
export let description: string
export let items: PortfolioItemData[]

const linkClass = `
  text-white bg-neutral-700 justify-center hover:bg-neutral-800 inline-flex items-center 
  focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm px-5 py-2.5 
  text-center dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800
`

/* Usage:
<Portfolio title="Our Work" description="test" items={portfolio}/>
*/
</script>

<script lang="ts" context="module">
export interface PortfolioItemData {
  customer: string
  title: string
  description: string
  href: string
  linkTitle: string
}
</script>
