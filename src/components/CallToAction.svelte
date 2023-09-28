<Section name={type === "image" ? "ctawithimg" : "cta"}>
  <Cta ctatype={type}>
    <svelte:fragment slot="img">
      {#if type === "image"}
        <img class="w-full dark:hidden" src={image} alt={imageAlt}/>
        {#if imageDark }
          <img class="w-full hidden dark:block" src={image} alt={imageAlt}/>
        {/if}
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="h2">{title}</svelte:fragment>
    <p class="mb-6 dark:text-gray-400 md:text-lg">{description}</p>
    <Button href={buttonLink} color="primary" size="lg">{buttonText}</Button>
  </Cta>
</Section>

<script lang="ts">
import { Section, Cta } from "flowbite-svelte-blocks"
import { Button } from "flowbite-svelte"

export let type: Cta["type"]
export let title: string
export let description: string
export let buttonText: string
export let buttonLink: string
export let image: string | undefined = undefined
export let imageDark: string | undefined = undefined
export let imageAlt: string | undefined = undefined
</script>
