<Section name="page404">
  <Page404>
    <svelte:fragment slot="h1">404</svelte:fragment>
    <svelte:fragment slot="paragraph">
      <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
        {title}
      </p>
      <p class="mb-4 text-lg font-ligh dark:text-gray-400">
        {description}
      </p>
      <Button href="/" size="lg" color="primary">{buttonText}</Button>
    </svelte:fragment>
  </Page404>
</Section>

<script lang="ts">
import Button from 'flowbite-svelte/Button.svelte'
import Section from 'flowbite-svelte-blocks/Section.svelte'
import Page404 from 'flowbite-svelte-blocks/page404/Page404.svelte'

export let title: string
export let description: string
export let buttonText: string
</script>
