<Section>
  <h1 class="dark:text-white text-4xl mb-8">{translations["title"]}</h1>

  {#if $cart.length}
    <Table class="w-full">
      <TableHead theadClass="bg-gray-100 dark:bg-gray-700 dark:text-white">
        <TableHeadCell align="left">{translations["product"]}</TableHeadCell>
        <TableHeadCell align="right">{translations["quantity"]}</TableHeadCell>
        <TableHeadCell align="right">{translations["price"]}</TableHeadCell>
        <TableHeadCell></TableHeadCell>
      </TableHead>
      <TableBody>
        {#each $cart as orderItem}
          <TableBodyRow class="border-b-2 border-secondary">
            <TableBodyCell align="left">
              <h3 class="text-xl hover:underline">
                <a href={orderItem.product_url}>{orderItem.product}</a>
              </h3>
              {#if orderItem.variation}
                <p class="dark:text-gray-300">Variation: {orderItem.variation}</p>
              {/if}
              {#if orderItem.style}
                <p class="dark:text-gray-300">Style: {orderItem.style}</p>
              {/if}
            </TableBodyCell>
            <TableBodyCell align="right" class="text-2xl">
              <b>{orderItem.quantity}</b>
            </TableBodyCell>
            <TableBodyCell align="right" class="text-2xl">
              <b>${orderItem.price.toFixed(2)}</b>
            </TableBodyCell>
            <TableBodyCell width="80">
              <Button
                size="sm"
                color="red"
                title={translations["remove_button"]}
                on:click={() => cartStore.removeProductFromCart(orderItem, translations)}>
                <TrashBinSolid size="sm"/>
              </Button>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
      <tfoot>
        <TableBodyRow class="bg-gray-100 dark:bg-gray-700">
          <TableHeadCell align="left">Subtotal</TableHeadCell>
          <TableBodyCell colspan="2" align="right" class="text-2xl">
            <b>${$subtotal.toFixed(2) ?? "0.00"}</b>
          </TableBodyCell>
          <TableBodyCell></TableBodyCell>
        </TableBodyRow>
      </tfoot>
    </Table>

    <div class="text-center py-4">
      <Button href="/checkout">{translations["checkout_button"]}</Button>
    </div>
  {/if}

  {#if isLoading}
    <ListPlaceholder divClass="bg-gray-100 dark:bg-gray-800 w-full px-4 py-8 animate-pulse"/>
  {/if}

  {#if !isLoading && !$cart.length}
    <NoProductsCard message={translations["no_products"]} buttonText={translations["shop_button"]}/>
  {/if}
</Section>

<script lang="ts">
import { onMount } from "svelte"
import Button from "flowbite-svelte/Button.svelte"
import Table from "flowbite-svelte/Table.svelte"
import TableHead from "flowbite-svelte/TableHead.svelte"
import TableBody from "flowbite-svelte/TableBody.svelte"
import TableBodyRow from "flowbite-svelte/TableBodyRow.svelte"
import TableHeadCell from "flowbite-svelte/TableHeadCell.svelte"
import TableBodyCell from "flowbite-svelte/TableBodyCell.svelte"
import TrashBinSolid from "flowbite-svelte-icons/TrashBinSolid.svelte"
import ListPlaceholder from "flowbite-svelte/ListPlaceholder.svelte"
import Section from "flowbite-svelte-blocks/Section.svelte"
import { cart, subtotal } from "@/store/cart"
import * as cartStore from "@/store/cart"
import NoProductsCard from "@/components/NoProductsCard.svelte"

export let translations: { [key: string]: string }

let isLoading = true

onMount(async () => {
  cartStore.loadCart()
  isLoading = false
})
</script>
