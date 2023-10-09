<div>
  <Label for={name} class="font-bold block mb-2">{label}</Label>
  {#if multiline}
    <Textarea
      {required}
      {unWrappedClass}
      {name}
      {placeholder}
      {value}
      id={name}
      color={errors ? "red" : "base"}/>
  {:else}
    <Input
      {required}
      unWrappedClass={multiline ? unWrappedClass : undefined}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      color={errors ? "red" : "base"}>
      <Fa slot="left" icon={icon}/>
    </Input>
  {/if}
  {#if errors}
    <Helper helperClass="my-1 text-xs" color="red">{errors.join(". ")}</Helper>
  {/if}
</div>

<script lang="ts">
import { faPenToSquare, type IconDefinition } from "@fortawesome/free-solid-svg-icons"
import Label from "flowbite-svelte/Label.svelte"
import Input from "flowbite-svelte/Input.svelte"
import Helper from "flowbite-svelte/Helper.svelte"
import Textarea from "flowbite-svelte/Textarea.svelte"
import Fa from "svelte-fa"

export let name: string
export let label: string
export let value: string
export let classes: string | undefined = undefined
export let errors: string[] | undefined = undefined
export let placeholder: string | undefined = undefined
export let required: boolean | undefined = undefined
export let multiline: boolean | undefined = undefined
export let icon: IconDefinition = faPenToSquare

let unWrappedClass = ""

$: if (errors) {
    unWrappedClass = `
      ${classes} block w-full disabled:cursor-not-allowed disabled:opacity-50 p-2.5 
      focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 
      bg-red-50 text-red-900 placeholder-red-700 dark:text-red-500 dark:placeholder-red-500 
      dark:bg-gray-700 border-red-500 dark:border-red-400 text-sm rounded-lg
    `
  } else {
    unWrappedClass = `
      ${classes} block w-full disabled:cursor-not-allowed disabled:opacity-50 p-2.5 
      focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 
      dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white 
      dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 text-sm rounded-lg
    `
  }
</script>
