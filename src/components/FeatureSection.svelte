<Section name="feature">
  <HeroHeader 
    class="max-w-screen-md mb-8 lg:mb-16" 
    h2Class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white" 
    pClass="sm:text-xl dark:text-gray-400">
    <svelte:fragment slot="h2">{title}</svelte:fragment>
    <svelte:fragment slot="paragraph">{description}</svelte:fragment>
  </HeroHeader>

  <FeatureDefault>
    {#each features as feature}
      <FeatureItem>
        <svelte:fragment slot="icon">
          <Fa size="lg" class="text-primary-600" icon={feature.icon}/>
        </svelte:fragment>
        <svelte:fragment slot="h3">{feature.name}</svelte:fragment>
        <svelte:fragment slot="paragraph"><span>{feature.description}</span></svelte:fragment>
      </FeatureItem>
    {/each}
  </FeatureDefault>
</Section>

<script lang="ts">
import type { TFunction } from "i18next";
import Fa from "svelte-fa"
import { type IconDefinition } from "@fortawesome/free-solid-svg-icons"
import Section from "flowbite-svelte-blocks/Section.svelte"
import HeroHeader from "flowbite-svelte-blocks/hero/HeroHeader.svelte"
import FeatureDefault from "flowbite-svelte-blocks/feature/FeatureDefault.svelte"
import FeatureItem from "flowbite-svelte-blocks/feature/FeatureItem.svelte"

export let title: string
export let description: string
export let features: Feature[]
</script>

<script lang="ts" context="module">
interface Feature {
  name: string
  description: string
  icon: IconDefinition
}

export function createFeatureList(
  base: string, 
  iconList: IconDefinition[], 
  t: TFunction
): Feature[] {
  return (new Array(9)).fill(null).map((_: any, i: number) => ({
    icon: iconList[i],
    name: t(`${base}.${i + 1}.name`),
    description: t(`${base}.${i + 1}.description`)
  }))
}
</script>