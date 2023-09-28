<Section name="logos">
  <HeroHeader>
    <svelte:fragment slot="h2">{title}</svelte:fragment>
    <div class="logo-grid">
      {#each logos as logo}
        <img src={logo} alt="logo"/>
      {/each}
    </div>
  </HeroHeader>
</Section>

<script lang="ts">
import Section from 'flowbite-svelte-blocks/Section.svelte'
import HeroHeader from 'flowbite-svelte-blocks/hero/HeroHeader.svelte'

export let title: string
export let logos: string[]

/* Usage:
<CustomerLogos 
  title="You'll be in Good Company" 
  logos={(new Array(6)).fill("images/logo-dark.svg", 0)}/>
*/
</script>

<style lang="postcss">
.logo-grid {
  @apply grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-6;
  @apply dark:text-gray-400;
}
</style>