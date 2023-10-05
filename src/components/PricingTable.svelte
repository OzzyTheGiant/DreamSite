<Section name="pricing">
  <PricingHead>
    <svelte:fragment slot="h2">{title}</svelte:fragment>
    <svelte:fragment slot="paragraph">{description}</svelte:fragment>
  </PricingHead>
  <div 
    class="space-y-8 lg:grid lg:grid-cols-4 sm:gap-6 xl:gap-10 lg:space-y-0">
    {#each tiers as tier}
      <PricingCard>
        <PricingBodyHead>
          <svelte:fragment slot="h3">{tier.name}</svelte:fragment>
          <svelte:fragment slot="paragraph">{tier.description}</svelte:fragment>
          <svelte:fragment slot="price">
            <span class="mr-2 text-5xl font-extrabold dark:text-gray-400">${tier.price}</span>
            <span class="text-gray-500 dark:text-gray-400">/{tier.unit}</span>
          </svelte:fragment>
        </PricingBodyHead>
        <PricingItemWrapper>
          {#each tier.features as feature}
            <PricingItem class="text-green-500 dark:text-green-400">
              <span class="dark:text-gray-400">{feature}</span>
            </PricingItem>
          {/each}
          <svelte:fragment slot="btn">
            {#if buttonLink && buttonText}
              <Button href={buttonLink} color="red">{buttonText}</Button>
            {/if}
          </svelte:fragment>
        </PricingItemWrapper>
      </PricingCard>
    {/each}
  </div>
</Section>

<script lang="ts">
import Button from 'flowbite-svelte/Button.svelte'
import Section from "flowbite-svelte-blocks/Section.svelte"
import PricingBodyHead from "flowbite-svelte-blocks/pricing/PricingBodyHead.svelte"
import PricingCard from "flowbite-svelte-blocks/pricing/PricingCard.svelte"
import PricingItemWrapper from "flowbite-svelte-blocks/pricing/PricingItemWrapper.svelte"
import PricingHead from "flowbite-svelte-blocks/pricing/PricingHead.svelte"
import PricingItem from "flowbite-svelte-blocks/pricing/PricingItem.svelte"

export let title: string
export let description: string
export let tiers: PricingTier[]
export let buttonLink: string | undefined = undefined
export let buttonText: string | undefined = undefined
</script>

<script lang="ts" context="module">
export interface PricingTier {
  name: string
  description: string
  price: number
  unit: string
  features: string[]
}

// NOTE: you must hardcode the amount of columns to use in the class string, as there is a bug where
// interpolating the column amount causes the class name to not show up
</script>

<style global lang="postcss">
div[class=*grid-cols-4] {
  @apply lg:grid-cols-4;
}
</style>
