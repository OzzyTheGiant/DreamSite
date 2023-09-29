
<Section name="social">
  <Social>
    {#each statistics as statistic}
    <div class="flex flex-col items-center justify-center">
      <dt class="mb-2 text-3xl md:text-4xl font-extrabold">{statistic.value}</dt>
      <dd class="font-light text-gray-500 dark:text-gray-400">{statistic.name}</dd>
    </div>
    {/each}
  </Social>
</Section>

<script lang="ts">
import Section from 'flowbite-svelte-blocks/Section.svelte'
import Social from "flowbite-svelte-blocks/social/Social.svelte"

export let statistics: { value: number, name: string }[]
</script>
