<Footer class="bg-neutral-500 rounded-none" footerType={type}>
  {#if type === "socialmedia"}
    <div class="grid gap-12 lg:grid-cols-6 lg:gap-24">
      <div class="col-span-2">
        <FooterBrand href="/" src="/images/logo-light.svg" alt={siteName} aClass="flex mb-6" />
        <p class="text-gray-400">{description}</p>
      </div>

      {#each linkGroups as linkGroup}
        <div>
          <h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">
            {linkGroup.name}
          </h2>
          <FooterLinkGroup ulClass="text-gray-200">
            {#each Object.entries(linkGroup.list) as [link, text]}
            <FooterLink liClass="mb-4" href={link}>{text}</FooterLink>
            {/each}
          </FooterLinkGroup>
        </div>
      {/each}

      <slot name="map"/>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <div class="sm:flex sm:items-center sm:justify-between">
      <FooterCopyright spanClass="text-gray-400" href="/" by={siteName}/>

      {#if hasIcons}
        <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
          <a href="https://facebook.com">
            <Fa size="lg" class="text-gray-400 hover:text-gray-100" icon={faFacebook}/>
          </a>
          <a href="https://instagram.com">
            <Fa size="lg" class="text-gray-400 hover:text-gray-100" icon={faInstagram}/>
          </a>
          <a href="https://twitter.com">
            <Fa size="lg" class="text-gray-400 hover:text-gray-100" icon={faTwitter}/>
          </a>
        </div>
      {/if}
    </div>
  {:else}
    <div class="mx-auto max-w-screen-xl text-center">
      <FooterBrand 
        href="/" 
        aClass="flex justify-center items-center text-2xl text-gray-900 dark:text-white"
        src="/images/logo-light.svg" 
        alt={siteName}/>

      {#if description}
        <p class="my-6 text-gray-400">{description}</p>
      {/if}

      <FooterLinkGroup 
        ulClass="flex flex-wrap justify-center items-center mb-6 text-gray-300 dark:text-white">
        {#each Object.entries(links) as [link, text]}
          <FooterLink 
            liClass="" 
            aClass="mr-4 hover:underline md:mr-6 font-bold" 
            href={link}>
            {text}
          </FooterLink>
        {/each}
      </FooterLinkGroup>
      <FooterCopyright spanClass="text-gray-400" href="/" by={siteName}/>
    </div>
  {/if}  
</Footer>

<script lang="ts">
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"
import Fa from "svelte-fa"
import Footer from "flowbite-svelte/Footer.svelte"
import FooterBrand from "flowbite-svelte/FooterBrand.svelte"
import FooterLink from 'flowbite-svelte/FooterLink.svelte'
import FooterLinkGroup from "flowbite-svelte/FooterLinkGroup.svelte"
import FooterCopyright from "flowbite-svelte/FooterCopyright.svelte"

export let type: Footer["footerType"]
export let description: string | undefined = undefined
export let siteName: string
export let links: { [key: string]: string } = {}
export let linkGroups: LinkGroup[] = []
export let hasIcons: boolean = false
</script>

<script lang="ts" context="module">
export interface LinkGroup {
  name: string
  list: { [link: string]: string }
}
</script>
  