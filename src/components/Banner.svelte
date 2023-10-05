{#if visible}
<Banner id="website-banner">
  <p class="text-sm font-light dark:text-gray-300"><slot/></p>
  <CloseButton class="close-button" on:click={() => (visible = false)}/>
</Banner>
{/if}

<script lang="ts">
import { Banner } from "flowbite-svelte-blocks";
import { CloseButton } from "flowbite-svelte";

export let visible = true;

// Sample Usage:
// <Banner client:load>This is a <a href="/" class="underline">test</a> banner</Banner>
</script>

<style global lang="postcss">
#website-banner .close-button {
  @apply text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5;
  @apply dark:hover:bg-gray-600 dark:hover:text-white;
}
</style>
