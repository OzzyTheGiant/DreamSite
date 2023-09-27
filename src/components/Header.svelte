<header>
  <Navbar 
    let:hidden 
    let:toggle 
    navClass="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800"
    navDivClass="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
    fluid={false}>

    <NavBrand href="/">
      <img src="/images/logo-dark.svg" class="mr-3 h-5" alt="DreamCraft Logo"/>
    </NavBrand>

    <div class="lg:hidden lg:order-2">
      <NavHamburger {btnClass} on:click={toggle}/>
    </div>

    <NavUl
      {hidden}
      divClass="justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
      ulClass="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 p-2">
      
      {#each Object.entries(links) as [link, text]}
        <NavLi href={link}>{text}</NavLi>
      {/each}
    </NavUl>
  </Navbar>
</header>

<script lang="ts">
import Navbar from "flowbite-svelte/Navbar.svelte"
import NavBrand from "flowbite-svelte/NavBrand.svelte"
import NavHamburger from "flowbite-svelte/NavHamburger.svelte"
import NavUl from "flowbite-svelte/NavUl.svelte"
import NavLi from "flowbite-svelte/NavLi.svelte"

export let links: { [key:string]: string }

const btnClass = `
  inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 
  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 
  dark:focus:ring-gray-600
`
</script>
