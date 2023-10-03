<Section name="testimonial" sectionClass="testimonial-container relative h-72 overflow-hidden">
  {#each testimonials as testimonial, index}
    {#if index === activeIndex}
      <div 
        class="absolute mx-auto top-0 left-0 right-0 -z-10" 
        in:flyIn|local
        out:flyOut|local>

        <Testimonial {icon}>
          <blockquote>
            <p class="text-2xl font-medium text-gray-900 dark:text-white">{testimonial.text}</p>
          </blockquote>
          <svelte:fragment slot="footer">
            <img class="w-6 h-6 rounded-full" src={testimonial.image} alt={testimonial.author} />
            <div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
              <div class="pr-3 font-medium text-gray-900 dark:text-white">
                {testimonial.author}
              </div>
              <div class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                {testimonial.jobTitle}
              </div>
            </div>
          </svelte:fragment>
        </Testimonial>
      </div>
    {/if}
  {/each}

  {#if testimonials.length > 1}
    <Button size="xs" class="testimonial-button" on:click={() => switchTestimonial(-1, true)}>
      <AngleLeft/>
    </Button>
    <Button size="xs" class="testimonial-button" on:click={() => switchTestimonial(1, true)}>
      <AngleRight/>
    </Button>
  {/if}
</Section>

<script lang="ts">
import { fly, type FlyParams } from "svelte/transition"
import Button from "flowbite-svelte/Button.svelte"
import Section from "flowbite-svelte-blocks/Section.svelte"
import Testimonial from "flowbite-svelte-blocks/testimonial/Testimonial.svelte"
import Quotes from "flowbite-svelte-icons/QuoteSolid.svelte"
import AngleLeft from "flowbite-svelte-icons/AngleLeftSolid.svelte"
import AngleRight from "flowbite-svelte-icons/AngleRightSolid.svelte"

export let testimonials: TestimonialData[]

const icon = Quotes as any

let activeIndex = 0
let animationInterval = 0
let reverse = false

function switchTestimonial(indexStepCount = 1, manual = false) {
  const totalTestimonials = testimonials.length

  if (manual) clearInterval(animationInterval)
  if (indexStepCount < 0) reverse = true

  activeIndex = (activeIndex + indexStepCount + totalTestimonials) % totalTestimonials
  
  if (manual) animationInterval = setInterval(switchTestimonial, 10000)
}

function flyIn(element: Element) {
  const config = fly(element, { x: reverse ? -200 : 200, duration: 500 })
  setTimeout(() => reverse = false, 1000)
  return config
}

function flyOut(element: Element) {
  const config = fly(element, { x: reverse ? 200 : -200, duration: 500 })
  setTimeout(() => reverse = false, 1000)
  return config
}

if (testimonials.length > 1) animationInterval = setInterval(switchTestimonial, 10000)

/* Usage:
<TestimonialSection client:load {testimonials}/>
*/
</script>

<script lang="ts" context="module">
export interface TestimonialData {
  author: string
  text: string
  image?: string
  jobTitle?: string
}
</script>

<style global lang="postcss">
.testimonial-container > div {
  @apply h-full flex items-end justify-center;
}

.testimonial-button {
  @apply bg-neutral-500 hover:bg-neutral-700 dark:bg-neutral-300 dark:hover:bg-neutral-400;
  @apply text-white mx-2;
}
</style>
