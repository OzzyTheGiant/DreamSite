<Section class="section">
  <div class="2xl:container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        items={createOptions(categories, categoryFilterLabel)}
        disabled={!!searchKeywords}
        value={selectedCategory}
        on:change={selectCategory}/>

      <Select
        class="inline-block w-full md:w-60 my-1 mr-4"
        items={createOptions(tags, tagFilterLabel)}
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

    {#each filteredProducts as product (product.id)}
      <ProductCard
        name={product.title}
        link={product.url}
        image={product.images?.[0]?.name ?? "https://via.placeholder.com/768x768/?text=DreamCraft"}
        imageAlt={product.images?.[0]?.alt ?? "DreamCraft"}
        price={product.pricing}
        buttonText={productCardButtonLabel}/>
    {/each}
  </div>
</Section>

<script lang="ts">
import Select from "flowbite-svelte/Select.svelte"
import Button from "flowbite-svelte/Button.svelte"
import Section from "flowbite-svelte-blocks/Section.svelte"
import SearchOutline from "flowbite-svelte-icons/SearchOutline.svelte"
import { Product, type ProductCategory, type ProductTag } from "@/models/Product"
import ProductCard from "@/components/ProductCard.svelte"
import TextField from "./TextField.svelte";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
// import ExcludeBakeSale from "@/mixins/exclude-bake-sale"

export let categoryFilterLabel: string
export let tagFilterLabel: string
export let productCardButtonLabel: string
export let products: Product[]
export let categories: ProductCategory[]
export let tags: ProductTag[]

let selectedCategory: number | undefined = undefined
let selectedTag: number | undefined = undefined
let searchKeywords = ""
let isSearching = false
  
$: filteredProducts = (() => {
  // remove Bake Sale products
  let productList = products // this.excludeBakeSaleProducts()

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
            categoryMatches = !!product.categories.find(
                category => category.id === selectedCategory
            )
        }
        
        if (product.tags && selectedTag) {
            tagMatches = !!product.tags.find(tag => tag.id === selectedTag)
        }

        return categoryMatches && tagMatches
      })
    }
  }

  // This is necessary because passing props from Astro causes array items to lose their class type
  return productList.map(product => new Product(product))
})()

function createOptions(
  items: { [key: string]: any },
  placeholder: string
): { value: any, name: string }[] {
  return [{ value: undefined, name: placeholder }].concat(
    items.map((item: { [key: string]: any }) => ({ value: item.id, name: item.name }))
  )
}

function selectCategory(event: Event): void {
  selectedCategory = parseInt((event.target as HTMLSelectElement)?.value ?? -1)
}

function selectTag(event: Event): void {
  selectedTag = parseInt((event.target as HTMLSelectElement)?.value ?? -1)
}
  
function clearFilters() {
  selectedCategory = undefined
  selectedTag = undefined
  searchKeywords = ""
}
</script>
  