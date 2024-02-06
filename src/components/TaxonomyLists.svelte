<div class="text-dark {$$props.class}">
  {#if categories.length}
    <div class="flex items-top w-full dark:text-accent-300">
      <Star class="h-8 mr-2 {dark ? 'text-white' : ''}"/>
      <ul class="mt-0 mb-4">
        {#each categories as category}
          <li 
            class="bg-main inline-block px-2 py-1 mr-2 mb-1 rounded-lg" 
            class:bg-white={dark}>
            {category.name}
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  {#if tags.length}
  <div class="flex items-top w-full dark:text-accent-300">
      <Tag class="h-8 mr-2 {dark ? 'text-white': ''}"/>
      <ul class="mt-0 mb-4">
          {#each tags as tag}
          <li 
              class="bg-main inline-block px-2 py-1 mr-2 mb-1 rounded-lg" 
              class:bg-white={dark}>
              {tag.name}
          </li>
          {/each}
      </ul>
  </div>
  {/if}
</div>

<script lang="ts">
import type { ProductCategory, ProductTag } from "@/models/Product"
import Star from "flowbite-svelte-icons/StarSolid.svelte"
import Tag from "flowbite-svelte-icons/TagSolid.svelte"

export let categories: ProductCategory[]
export let tags: ProductTag[]
export let dark: boolean = false
</script>
