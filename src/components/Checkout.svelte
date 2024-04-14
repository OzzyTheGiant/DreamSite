<Section>
  {#if $cart.length}
    <div id="checkout" class="2xl:container grid grid-cols-1 md:grid-cols-3 gap-4">
      <main class="md:col-span-2 order-2 md:order-1">
        <h2 class="text-2xl dark:text-white mb-4">Review Products</h2>

        <Table>
          <TableHead class="text-white">
            <TableHeadCell align="left">Product</TableHeadCell>
            <TableHeadCell align="right">Price</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableHead>
          <TableBody>
            {#each $cart as item}
              <TableBodyRow class="border-b-2">
                <TableBodyCell align="left">
                  <h3 class="text-xl hover:underline">
                    <a href={item.product_url}>{item.product}</a>
                  </h3>
                  {#if item.variation}
                    <p class="dark:text-gray-300">Variation: {item.variation}</p>
                  {/if}
                  {#if item.style}
                    <p class="dark:text-gray-300">Style: {item.style}</p>
                  {/if}
                </TableBodyCell>
                <TableBodyCell align="right" class="text-2xl">
                  <b>${(item.price * item.quantity).toFixed(2)}</b>
                </TableBodyCell>
                <TableBodyCell width="80">
                  <Button
                    size="sm"
                    color="red"
                    title={translations["remove_button"]}
                    on:click={() => removeProductFromCart(item, translations)}>
                    <TrashBinSolid size="sm"/>
                  </Button>
                </TableBodyCell>
              </TableBodyRow>
            {/each}
          </TableBody>
        </Table>

        <form use:form method="post" on:change={enablePayPalButtons}>
          <h2 class="text-2xl text-white my-4">Customer Information</h2>

          <Card class="grid grid-cols-2 gap-4 max-w-none">
            <TextField
              required
              name="first_name"
              label="First Name"
              errors={!!$touched.first_name && $errors.first_name}
              bind:value={$data.first_name}/>
            
            <TextField
              required
              name="last_name"
              label="Last Name"
              errors={!!$touched.last_name && $errors.last_name}
              bind:value={$data.last_name}/>

            <TextField
              required
              type="email"
              name="email"
              label="Email Address"
              errors={!!$touched.email && $errors.email}
              bind:value={$data.email}/>

            <TextField
              required
              name="phone"
              label="Phone Number"
              errors={!!$touched.phone && $errors.phone}
              bind:value={$data.phone}/>
          </Card>

          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h2 class="text-2xl dark:text-white my-4">Shipping Address</h2>
              <Card class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 max-w-none">
                <TextField
                  required
                  name="shipping_street_address"
                  label="Street Address"
                  errors={!!$touched.shipping_street_address && $errors.shipping_street_address}
                  bind:value={$data.shipping_street_address}/>
    
                <TextField
                  name="shipping_unit"
                  label="Unit"
                  errors={!!$touched.shipping_unit && $errors.shipping_unit}
                  bind:value={$data.shipping_unit}/>
    
                <TextField
                  required
                  name="shipping_city"
                  label="City"
                  errors={!!$touched.shipping_city && $errors.shipping_city}
                  bind:value={$data.shipping_city}/>
    
                <TextField
                  required
                  name="shipping_state"
                  label="State"
                  maxlength={2}
                  errors={!!$touched.shipping_state && $errors.shipping_state}
                  bind:value={$data.shipping_state}
                  on:input={updateTaxes}/>
    
                <TextField
                  required
                  name="shipping_zip"
                  label="Zip"
                  errors={!!$touched.shipping_zip && $errors.shipping_zip}
                  bind:value={$data.shipping_zip}/>
              </Card>
            </div>

            <div>
              <h2 class="text-2xl dark:text-white my-4">Billing Address</h2>
              <Card class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 max-w-none">
                <Checkbox
                  id="same-as-shipping"
                  class="col-span-full flex-grow-0 flex-shrink-0 flex items-center w-full mr-4"
                  name="same_as_shipping"
                  bind:checked={$data.same_as_shipping}>
                  Same as shipping address
                </Checkbox>
                  
                {#if !$data.same_as_shipping}
                  <TextField
                    required
                    name="billing_street_address"
                    label="Street Address"
                    errors={!!$touched.billing_street_address && $errors.billing_street_address}
                    bind:value={$data.billing_street_address}/>
      
                  <TextField
                    name="billing_unit"
                    label="Unit"
                    errors={!!$touched.billing_unit && $errors.billing_unit}
                    bind:value={$data.billing_unit}/>
      
                  <TextField
                    required
                    name="billing_city"
                    label="City"
                    errors={!!$touched.billing_city && $errors.billing_city}
                    bind:value={$data.billing_city}/>
      
                  <TextField
                    required
                    name="billing_state"
                    label="State"
                    maxlength={2}
                    errors={!!$touched.billing_state && $errors.billing_state}
                    bind:value={$data.billing_state}
                    on:input={updateTaxes}/>
      
                  <TextField
                    required
                    name="billing_zip"
                    label="Zip"
                    errors={!!$touched.billing_zip && $errors.billing_zip}
                    bind:value={$data.billing_zip}/>
                {/if}
              </Card>
            </div>
          </div>

          <h3 class="text-2xl dark:text-white my-4">Select Shipping</h3>

          <Card class="col-span-2 max-w-none">
            <fieldset>
              <Radio
                id="standard-shipping"
                class="flex-grow-0 flex-shrink-0 flex items-center text-lg max-w-none mr-4"
                name="shipping_selection"
                data-value="standard"
                value="standard"
                checked={$data.shipping_selection === "standard"}
                bind:group={$data.shipping_selection}
                on:change={updateShipping}>
                Standard
              </Radio>
  
              <Radio
                class="flex-grow-0 flex-shrink-0 flex items-center text-lg max-w-none mr-4"
                id="priority-shipping"
                name="shipping_selection"
                data-value="priority"
                value="priority"
                checked={$data.shipping_selection === "priority"}
                bind:group={$data.shipping_selection}
                on:change={updateShipping}>
                Priority Mail
              </Radio>
  
              <Radio
                id="local-shipping"
                class="flex-grow-0 flex-shrink-0 flex items-center text-lg max-w-none mr-4"
                name="shipping_selection"
                data-value="pickup"
                value="pickup"
                checked={$data.shipping_selection === "pickup"}
                bind:group={$data.shipping_selection}
                on:change={updateShipping}>
                Local Pickup (Harlingen, TX)
              </Radio>
            </fieldset>
          </Card>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card class="mt-8 max-w-none">
              <TextField
                required
                name="coupon"
                label="Apply Coupon"
                readonly={discount !== 0}
                errors={!!$touched.coupon && $errors.coupon}
                bind:value={$data.coupon}
                on:change={updateShipping}/>
  
              <Button class="main ml-auto sm:w-32" on:click={applyCoupon}>
                APPLY
              </Button>
  
              <p class="text-main col-span-2" class:hidden={!couponApplicationMessage}>
                {couponApplicationMessage}
              </p>
            </Card>

            <Card class="single-column max-w-none mt-8">
              <TextField
                multiline
                classes="!bg-gray-600 !border-gray-500"
                label="Any special requests or notes?"
                name="customer_requests"
                bind:value={$data.customer_requests}/>
            </Card>
          </div>

          <h2 class="text-2xl dark:text-white my-4">Payment Method</h2>

          <!-- 
            TODO: replace this with toast notification
            <p
              ref="validationForForm"
              class="text-xl font-bold border-4 border-main rounded-lg p-2 my-4" 
              v-show="formValidationError">
              {{ formValidationError }}
            </p> 
          -->
        </form>

        <div id="total-box">
          <div id="payment-gateway"></div>
        </div>
      </main>

      <aside class="order-1 md:order-2">
        <h2 class="text-2xl dark:text-white mb-4">Order Summary</h2>

        <div class="bg-dark rounded-lg">
          <table class="text-white w-full text-lg" cellpadding="2">
            <TableBody>
              <TableBodyRow>
                <TableBodyCell>Items ({getTotalQuantity($cart)})</TableBodyCell>
                <TableBodyCell align="right">${$subtotal.toFixed(2)}</TableBodyCell>
              </TableBodyRow>
              {#if discount}
                <TableBodyRow>
                  <TableBodyCell>Discount</TableBodyCell>
                  <TableBodyCell align="right">${discount.toFixed(2)}</TableBodyCell>
                </TableBodyRow>
              {/if}
              <TableBodyRow>
                <TableBodyCell>Shipping & Handling</TableBodyCell>
                <TableBodyCell align="right">${shipping.toFixed(2)}</TableBodyCell>
              </TableBodyRow>
              <TableBodyRow>
                <TableBodyCell>Taxes</TableBodyCell>
                <TableBodyCell align="right">${taxes.toFixed(2)}</TableBodyCell>
              </TableBodyRow>
            </TableBody>
            <tfoot class="bg-gray-700">
              <TableBodyRow class="text-main text-white border-t-2 border-white">
                <TableHeadCell align="left">Order Total:</TableHeadCell>
                <TableHeadCell align="right">${total.toFixed(2)}</TableHeadCell>
              </TableBodyRow>
            </tfoot>
          </table>
        </div>
      </aside>
    </div>
  {:else if !isLoading}
    <NoProductsCard message={translations["no_products"]} buttonText={translations["shop_button"]}/>
  {/if}
</Section>

<!-- <page-query>
query CheckoutRules {
  // TODO: handle coupon application on the server
  coupons: allStrapiCoupons {
      edges {
          node {
              name
              discount
              type
              expires
          }
      }
  }
}
</page-query> -->

<script lang="ts">
import { onMount } from "svelte"
import * as yup from "yup"
import { createForm } from "felte"
import { validator } from "@felte/validator-yup"
import Card from "flowbite-svelte/Card.svelte"
import Button from "flowbite-svelte/Button.svelte"
import Checkbox from "flowbite-svelte/Checkbox.svelte"
import Radio from "flowbite-svelte/Radio.svelte"
import Table from "flowbite-svelte/Table.svelte"
import TableHead from "flowbite-svelte/TableHead.svelte"
import TableHeadCell from "flowbite-svelte/TableHeadCell.svelte"
import TableBody from "flowbite-svelte/TableBody.svelte"
import TableBodyRow from "flowbite-svelte/TableBodyRow.svelte"
import TableBodyCell from "flowbite-svelte/TableBodyCell.svelte"
import Section from "flowbite-svelte-blocks/Section.svelte"
import TrashBinSolid from "flowbite-svelte-icons/TrashBinSolid.svelte"
import { type OrderItem } from "@/models/Order"
import type { Product, ShippingRule } from "@/models/Product"
import { cart, subtotal, loadCart, getTotalQuantity, removeProductFromCart } from "@/store/cart"
import TextField from "@/components/TextField.svelte"
import NoProductsCard from "@/components/NoProductsCard.svelte"

type AltFieldSchema = Parameters<yup.StringSchema["when"]>[1]["then"]

export let translations: { [key: string]: string }

const required: AltFieldSchema = (schema) => schema.required()

let isLoading = true
let formValidationError: string | null = null
let couponApplicationMessage: string | null = null

// TODO: create order workflow
let shipping = 0
let taxes = 0
let discount = 0

// TODO: fetch shipping rules
let shippingRules: ShippingRule[] = []

const schema = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),

  shipping_street_address: yup.string().required(),
  shipping_unit: yup.string(),
  shipping_city: yup.string().required(),
  shipping_state: yup.string().required(),
  shipping_zip: yup.string().required(),

  same_as_shipping: yup.boolean(),
  shipping_selection: yup.string().oneOf(["standard", "priority", "local"]),
  customer_requests: yup.string(),

  billing_street_address: yup.string().when("same_as_shipping", { is: true, then: required }),
  billing_unit: yup.string(),
  billing_city: yup.string().required().when("same_as_shipping", { is: true, then: required }),
  billing_state: yup.string().required().when("same_as_shipping", { is: true, then: required }),
  billing_zip: yup.string().required().when("same_as_shipping", { is: true, then: required })
})

// Checkout Form handler
const { form, data, touched, errors } = createForm({
  extend: validator({ schema }),
  initialValues: {
    shipping_selection: "standard",
    same_as_shipping: true
  },
  onSubmit(values: any): void {
    console.log(values)
  }
} as any)

$: total = Math.round(($subtotal + shipping + taxes - discount) * 100) / 100
$: {
  // Update state for each field to mark them as "touched" 
  // if current data different from initial data
  for (const key of Object.keys($data)) {
    if ($data[key]) $touched[key] = true
  }
}

function enablePayPalButtons() {
  // this.$checkout.enableButtons(
  //   this.$refs.customerForm.checkValidity() &&
  //   this.$refs.billingForm.checkValidity() &&
  //   this.$refs.shippingForm.checkValidity()
  // )
}

function removeProduct(item: OrderItem) {
  removeProductFromCart(item, translations)
  // TODO: refresh cart
}

function applyCoupon(event: Event) {
  // TODO: Set up coupon application on the server
  // event.preventDefault()

  // try {
  //   const coupon = this.$page.coupons.edges.find(
  //     coupon => coupon.node.name === this.$checkout.couponCode
  //   )

  //   if (!coupon) throw new Error("Coupon doesn't exist")

  // BEGIN EMBEDDED FUNCTION
  //   if (!dayjs().isBefore(coupon.node.expires)) throw new Error("Coupon has expired!")

  //   this.coupon = coupon.node.type === "percent" ? 
  //       Math.round(this.subtotal * (coupon.node.discount / 100) * 100) / 100 * -1 :
  //       coupon.node.discount * -1

  //   this.subtotal += this.coupon
  // END EMBEDDED FUNCTION

  //   this.updateTaxes()
  //   this.updateShipping()
  //   this.couponApplicationMessage = "Coupon applied successfully"
  // } catch (error) {
  //   this.couponApplicationMessage = error.message
  // }
}

function updateTaxes(event?: CustomEvent): void {
  const value = event?.detail

  // TODO: Handle sales tax for all states
  if (value === "TX") taxes = Math.round($subtotal * 0.0825 * 100) / 100
  else taxes = 0
}

function updateShipping(event?: Event): void {
  const _cart = $cart
  console.log(event)
  const shippingSelection: string = (event?.target as HTMLInputElement).value
  const itemCounts: { [key:string]: number } = {}
  let shippingSum = 0
  let totalQuantity = _cart.reduce((qt, product) => qt + product.quantity, 0)

  if (!_cart.length || !shippingRules.length || shippingSelection === "pickup") {
    console.log("pickup")
    shipping = 0
    return
  }

  for (const rule of shippingRules) {
    // Rule 1: Check if rule based on price threshold and it's less than subtotal
    const hasPriceThreshold = rule.price_threshold && rule.price_threshold <= $subtotal
    // Rule 2: Check if shipping rule is based on number of items ordered for the specified rule
    const hasItemThreshold = rule.item_threshold && rule.item_threshold <= totalQuantity

    switch(shippingSelection) {
      case "priority": shippingSum = rule.priority_rate; break
      case "standard": shippingSum = rule.rate; break
      default:         shippingSum = 0
    }

    console.log(shippingSelection, shippingSum)

    if (hasItemThreshold) {
      if (itemCounts[rule.id] === undefined) itemCounts[rule.id] = 0
      itemCounts[rule.id]++
    }

    if (hasPriceThreshold || hasItemThreshold) {
      shippingSum -= rule.discount_amount / 100 * shippingSum
    }
  }

  // Do not allow negative numbers for shipping
  if (shippingSum < 0) shipping = 0
  else shipping = shippingSum
}

function validateForm() {
  // TODO: perform validation with Yup
  // for (const key in this.$refs) {
  //   if (!key.endsWith("Form") && !this.$refs[key].checkValidity()) {
  //     const fieldLabel = this.$refs[key].previousElementSibling.innerText
  //     this.formValidationError = `${fieldLabel}: ${this.$refs[key].validationMessage}` || 
  //     "Please fill in all required fields"
  //     this.$refs.validationForForm.scrollIntoView()
  //     return
  //   } else {
  //     this.formValidationError = null
  //   }
  // }
}

function clearCartAndRedirect() {
  // TODO: fetch download links from products
  const products: Product[] = []
  // pass download links to Thank You page using URL query params
  const queryParams = new URLSearchParams()

  // remove duplicates prior to iterating
  for (const product of products) {
    if (product.download_file) queryParams.append("downloads", product.download_file.filename_disk)
  }

  let queryString = queryParams.toString()
  if (queryString) queryString = `?${queryString}`

  // TODO: delete cart from server and cart id from session storage
  window.location.replace(`/thank-you${queryString}`)
}
  
onMount(async () => {
  await loadCart()
  // const _cart = $cart

  cart.subscribe(cartData => {
    isLoading = false
    shippingRules = cartData.map(product => product.shipping_rule)
  })

  // Set up PayPalCheckout service with PayPal Buttons API
  if (1) {
    // this.$checkout.setUpAndRender
    // setUpPaymentGateway("#payment-gateway", _cart, validateForm, clearCartAndRedirect)
  }
})
</script>

<style lang="postcss">
#total-box {
  @apply border-primary-500;
  @apply items-center;
  @apply border-4;
  @apply rounded-lg;
  @apply py-4;
  @apply px-2;
  @apply mt-4;
}

/* #paypal-button-container > [id*="zoid-paypal-buttons"] {
  @apply max-w-xl;
  @apply block;
  @apply mx-auto;
} */
</style>
