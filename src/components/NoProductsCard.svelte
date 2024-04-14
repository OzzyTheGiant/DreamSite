<div class="bg-gray-200 dark:bg-gray-700 text-center px-4 py-12">
  <p class="dark:text-white text-3xl my-8">{message}</p>
  <Button href="/shop">{buttonText}</Button>
</div>

<script lang="ts">
import Button from "flowbite-svelte/Button.svelte"

export let message: string
export let buttonText: string
</script>
