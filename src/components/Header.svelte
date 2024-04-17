<header>
  <Navbar 
    let:hidden 
    let:toggle 
    navClass="bg-white border-gray-200 px-4 lg:px-6 py-2.5 lg:py-1.5 dark:bg-gray-800"
    navDivClass="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
    fluid={false}>

    <NavBrand href="/">
      <img 
        src={`/images/logo-${darkMode ? 'light' : 'dark'}.svg`} 
        class="mr-3 h-5" 
        alt="DreamCraft Logo"/>
    </NavBrand>

    <div class="lg:hidden lg:order-2">
      <NavHamburger {btnClass} on:click={toggle}/>
    </div>

    <NavUl
      {hidden}
      divClass="justify-between justify-self-end items-center w-full lg:flex lg:w-auto lg:order-1"
      ulClass="flex flex-col lg:items-center mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 p-2">
      
      {#each Object.entries(links) as [link, text]}
        {#if text === "cart"}
          <NavLi href={link}>
            <span class="block relative p-1">
              <Cart size="md"/>
              {#if hasCart && getTotalQuantity($cart) || cartProductCount}
                <Indicator 
                  border
                  size="xl" 
                  color="red"
                  placement="top-right"
                  class="text-white text-sm font-bold">
                  {getTotalQuantity($cart) || cartProductCount}
                </Indicator>
              {/if}
            </span>
          </NavLi>
        {:else}
          <NavLi href={link}>{text}</NavLi>
        {/if}
      {/each}

      <NavLi>
        {#if hasDarkModeButton}
          <Button size="sm" color="alternative" on:click={toggleDarkMode}>
            {#if darkMode}
              <LightBulbOutline/>
            {:else}
              <LightBulbSolid/>
            {/if}
          </Button>
        {/if}
      </NavLi>
    </NavUl>
  </Navbar>
</header>

<script lang="ts">
import { onMount } from "svelte"
import Button from "flowbite-svelte/Button.svelte"
import Navbar from "flowbite-svelte/Navbar.svelte"
import NavBrand from "flowbite-svelte/NavBrand.svelte"
import NavHamburger from "flowbite-svelte/NavHamburger.svelte"
import NavUl from "flowbite-svelte/NavUl.svelte"
import NavLi from "flowbite-svelte/NavLi.svelte"
import Indicator from "flowbite-svelte/Indicator.svelte"
import Cart from "flowbite-svelte-icons/CartOutline.svelte"
import LightBulbSolid from "flowbite-svelte-icons/LightbulbSolid.svelte"
import LightBulbOutline from "flowbite-svelte-icons/LightbulbOutline.svelte"
import { cart, getTotalQuantity, loadCartProductCount } from "@/store/cart"

export let links: { [key:string]: string }
export let hasDarkModeButton: boolean = false
export let hasCart: boolean = false

let darkMode = false
let cartProductCount = 0

const btnClass = `
  inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 
  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 
  dark:focus:ring-gray-600
`

function toggleDarkMode(): void {
  darkMode = !darkMode
  document.querySelector("html")?.classList.toggle("dark")
}

onMount(() => {
  if (document.querySelector("html")!.classList.contains("dark")) darkMode = true
  if (hasCart) cartProductCount = loadCartProductCount()
})
</script>
