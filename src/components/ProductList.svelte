<Section>
  {#if title}
    <h2 class="text-4xl dark:text-white text-center mb-8">{title}</h2>
  {/if}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#if withFilters}
      <div class="md:col-span-2 lg:col-span-3 md:flex items-center flex-wrap">
        <div class="my-1 mr-4 flex items-center w-full md:w-64">
          <TextField
            classes="!my-0"
            name="search_field"
            placeholder="Search Products..."
            icon={faShoppingBag}
            value={searchKeywords}
            on:input={event => searchKeywords = event.detail}/>
          
          <Button class="w-8 h-10 ml-2 my-1" on:click={() => isSearching = true}>
            <SearchOutline class="dark:text-white" size="md"/>
          </Button>
        </div>

        <Select
          class="inline-block w-full md:w-60 my-1 mr-4"
          items={createOptions(categoryList, categoryFilterLabel ?? "")}
          disabled={!!searchKeywords}
          value={selectedCategory}
          on:change={selectCategory}/>

        <Select
          class="inline-block w-full md:w-60 my-1 mr-4"
          items={createOptions(tagList, tagFilterLabel ?? "")}
          disabled={!!searchKeywords}
          value={selectedTag}
          on:change={selectTag}/>

        {#if searchKeywords || selectedCategory || selectedTag}
          <Button on:click={clearFilters}>Clear Filters</Button>
        {/if}
      </div>

      <p 
        class="text-center text-3xl md:col-span-2 lg:col-span-3 text-white py-32 border-2 border-white" 
        class:hidden={filteredProducts.length}>
        No products found matching these filters
      </p>
    {/if}

    {#each filteredProducts as product (product.id)}
      <ProductCard
        name={product.title}
        link={`${product.id}/${product.url}`}
        image={getImageURL(product.images[0], apiURL)}
        imageAlt={product.images?.[0]?.title ?? "DreamCraft"}
        price={product.pricing}
        buttonText={productCardButtonLabel}/>
    {/each}
  </div>
</Section>

<script lang="ts">
import { onMount } from "svelte"
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons"
import Select from "flowbite-svelte/Select.svelte"
import Button from "flowbite-svelte/Button.svelte"
import Section from "flowbite-svelte-blocks/Section.svelte"
import SearchOutline from "flowbite-svelte-icons/SearchOutline.svelte"
import { Product } from "@/models/Product"
import { fetchProductList } from "@/services/directus"
import { getImageURL } from "@/services/images"
import ProductCard from "@/components/ProductCard.svelte"
import TextField from "@/components/TextField.svelte"

export let productCardButtonLabel: string
export let apiURL: string
export let products: Product[]
export let title: string | undefined = undefined
export let withFilters: boolean = false
export let categories: string[] = []
export let tags: string[] = []
export let categoryFilterLabel: string | undefined = undefined
export let tagFilterLabel: string | undefined = undefined

let selectedCategory: string | undefined = undefined
let selectedTag: string | undefined = undefined
let searchKeywords = ""
let isSearching = false
let productList = products
let categoryList = categories
let tagList = tags
  
$: filteredProducts = (() => {
  if (productList.length) {
    // filter by search keywords or by category or tag
    if (isSearching && !!searchKeywords) {
      isSearching = false
      productList = productList.filter(product =>
          product.title.toLowerCase().includes(searchKeywords.toLowerCase())
      )
    } else if (selectedCategory || selectedTag) {
      productList = productList.filter(product => {
        let categoryMatches = true
        let tagMatches = true

        if (product.categories && selectedCategory) {
            categoryMatches = !!product.categories.find(cat => cat.name === selectedCategory)
        }
        
        if (product.tags && selectedTag) {
            tagMatches = !!product.tags.find(tag => tag.name === selectedTag)
        }

        return categoryMatches && tagMatches
      })
    }
  }

  // This is necessary because passing props from Astro causes array items to lose their class type
  return productList.map(product => new Product(product, true))
})()

function createOptions(items: string[], placeholder: string): { value: any, name: string }[] {
  return [{ value: undefined as any, name: placeholder }].concat(
    items.map((item: string) => ({ value: item, name: item }))
  )
}

function selectCategory(event: Event): void {
  selectedCategory = (event.target as HTMLSelectElement)?.value
}

function selectTag(event: Event): void {
  selectedTag = (event.target as HTMLSelectElement)?.value
}
  
function clearFilters() {
  selectedCategory = undefined
  selectedTag = undefined
  searchKeywords = ""
}

onMount(async () => {
  if (!withFilters) return

  const products = await fetchProductList()

  if (!products) return

  productList = products
  categoryList = []
  tagList = []

  // recreate list of categories and tags for filter fields
  for (const product of products) {
    const categories = product.categories.map(cat => cat.name)
    const tags = product.tags.map(tag => tag.name)
    categoryList = categoryList.concat(categories)
    tagList = tagList.concat(tags)
  }
})
</script>
  