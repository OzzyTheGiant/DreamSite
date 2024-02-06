<Section>
  <div class="grid items-start grid-cols-1 md:grid-cols-2 gap-8">
    <Carousel
      class="bg-gray-50 dark:bg-gray-800"
      id="carousel"
      images={getCarouselImages(apiURL, product.images, selectedStyle)}
      let:Indicators>
      <Indicators activeClass="bg-primary-300" inactiveClass="bg-primary-100"/>
    </Carousel>
  
    <div>
      <h1 class="font-body text-secondary text-xl md:text-3xl dark:text-white">
        <b>{product.title}</b>
      </h1>
      <p class="my-8 text-4xl dark:text-gray-300">{price}</p>
      <p class="text-xl mb-4 dark:text-gray-500">{product.description}</p>
  
      <TaxonomyLists categories={product.categories} tags={product.tags}/>
      <SocialMediaButtons title={product.title} uri={pageURL}/>
  
      <hr class="my-4"/>
  
      {#if hasVariations}
        <Select
          class="my-4 w-48"
          value={selectedVariation?.variation_name}
          items={createOptions(product.variations, variationsLabel, "variation_name")}
          on:change={selectVariation}/>
      {/if}
  
      {#if hasStyles}
        <Select
          class="my-4 w-48"
          value={selectedStyle?.style_name}
          items={createOptions(product.styles, stylesLabel, "style_name")}
          on:change={selectStyle}/>
      {/if}
  
      <TextField
        label="Quantity"
        name="quantity"
        type="number"
        classes="bg-white text-dark border-dark text-center !w-24 mb-0" 
        value={quantity.toString()} 
        on:input={setQuantity}/>
  
      <Button
        class="my-4 px-8 py-4 hover:bg-main-light {isButtonDisabled ? 'opacity-30' : ''}"
        disabled={isButtonDisabled} 
        on:click={addToCart}>
        {inCart ? "Update" : "Add To"} Cart
      </Button>
    </div>
  </div>
</Section>


<script lang="ts">
import Select from "flowbite-svelte/Select.svelte"
import Carousel from "flowbite-svelte/Carousel.svelte"
import Button from "flowbite-svelte/Button.svelte"
import Section from "flowbite-svelte-blocks/Section.svelte"
import { Product, type ProductStyle, type ProductVariation } from "@/models/Product"
import { getProductFromCart, addProductToCart } from "@/services/e-commerce"
import { getCarouselImages } from "@/services/images"
import TextField from "@/components/TextField.svelte"
import SocialMediaButtons from "@/components/SocialMediaButtons.svelte"
import TaxonomyLists from "@/components/TaxonomyLists.svelte"

export let product: Product
export let apiURL: string
export let pageURL: string
export let variationsLabel: string
export let stylesLabel: string

const orderItem = getProductFromCart(product.id)
const productModel = new Product(product)

let inCart = false
let selectedVariation: ProductVariation | undefined
let selectedStyle: ProductStyle | undefined
let quantity = 0

$: hasVariations = product.variations.length
$: hasStyles = product.styles.length
$: price = productModel.getVariationPrice(selectedVariation)

$: isButtonDisabled = (() => {
    let disabled = false

    // check that quantity has been entered in any case
    if (!quantity) return true

    // if product either has variations or styles, check if both are selected
    if (hasVariations && hasStyles) disabled = !selectedVariation && !selectedStyle
    else if (hasVariations) disabled = !selectedVariation
    else if (hasStyles) disabled = !selectedStyle
    return disabled
})()

function addToCart(): void {
  addProductToCart(
    {
      product_id: product.id,
      product: product.title,
      quantity,
      variation: selectVariation?.name ?? "",
      style: selectedStyle?.style_name ?? "",
      price: selectedVariation ? 
        parseFloat(product.getVariationPrice(selectedVariation).split("$")[1]) :
        product.price_default,
      product_url: pageURL
    },
    product.shipping_rules,
    // TODO: do something about the download file url
  )
  
  window.location.assign(inCart ? "/cart" : "/shop")
}

function createOptions(
  items: any[],
  placeholder: string,
  key: string
): { value: any, name: string }[] {
  return [{ value: undefined, name: placeholder }].concat(
    items.map((item: any) => ({ 
      value: item[key], name: item[key] 
    }))
  )
}

function setQuantity(event: CustomEvent): void {
  quantity = parseInt(event.detail)
}

function selectVariation(event: Event): void {
  const variation = (event.target as HTMLSelectElement)?.value
  selectedVariation = product.variations.find(item => item.variation_name === variation)
}

function selectStyle(event: Event): void {
  const style = (event.target as HTMLSelectElement)?.value
  selectedStyle = product.styles.find(item => item.style_name === style)
}

if (orderItem) {
  inCart = true
  selectedVariation = product.variations.find(
    variation => variation.variation_name === orderItem.variation
  )

  selectedStyle = product.styles.find(style => style.style_name === orderItem.style)
  quantity = orderItem.quantity
}
</script>

<style global lang="postcss">
#carousel {
  @apply mx-auto max-w-2xl;
  height: 480px;

  img {
    height: inherit;
    @apply object-contain !important;
  }
}
</style>
  