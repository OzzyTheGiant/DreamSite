<Card>
  <div>
    <img
      class="w-full h-72 object-cover object-center"
      width="{width}px"
      height="{height}px"
      src={image}
      alt={imageAlt}/>

    <h3 class="card-content text-center text-2xl md:text-xl lg:text-2xl font-body px-4 pt-4">
      {name}
    </h3>
  </div>

  <div class="p-4 text-center">
    <p class="text-main text-3xl md:text-2xl lg:text-3xl mb-4">
      <b>{price}</b>
    </p>
    <Button link href={`/products/${link}`}>{buttonText}</Button>
  </div>
</Card>

<script lang="ts">
import Card from "flowbite-svelte/Card.svelte"
import Button from "flowbite-svelte/Button.svelte"

export let name: string
export let price: string | number
export let link: string
export let image: string
export let imageAlt: string
export let width: number = 382
export let height: number = 286
export let buttonText: string
</script>
