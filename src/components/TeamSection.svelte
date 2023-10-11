<Section name="team">
  <TeamWrapper>
    <TeamHeader>
      <svelte:fragment slot="label">{title}</svelte:fragment>
      <p class="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
        {description}
      </p>
    </TeamHeader>
    <TeamBody>
      {#each members as { href, image, imageAlt, name, jobTitle, description, ...member }}
        <TeamItem {href} {name} {jobTitle} divClass="dark:text-gray-300" src={image} alt={imageAlt}>
          <p class="mt-3 mb-4 font-light dark:text-gray-400">{description}</p>
          <svelte:fragment slot="social">
            {#if member.email}
              <a href={`mailto:${member.email}`}><EnvelopeSolid/></a>
            {/if}
          </svelte:fragment>
        </TeamItem>
      {/each}
    </TeamBody>
  </TeamWrapper>
</Section>

<script lang="ts">
import Section from "flowbite-svelte-blocks/Section.svelte"
import TeamWrapper from 'flowbite-svelte-blocks/team/TeamWrapper.svelte'
import TeamHeader from 'flowbite-svelte-blocks/team/TeamHeader.svelte'
import TeamBody from 'flowbite-svelte-blocks/team/TeamBody.svelte'
import TeamItem from 'flowbite-svelte-blocks/team/TeamItem.svelte'
import EnvelopeSolid from "flowbite-svelte-icons/EnvelopeSolid.svelte"

export let title: string = "Our Team"
export let description: string
export let members: TeamMember[]

/* Usage:
<TeamSection title="Our Team" description="Test" members={members}/>
*/
</script>

<script lang="ts" context="module">
/** Team member properties. Can be extended to have other contact details */
export interface TeamMember {
  href: string
  image: string
  imageAlt: string
  name: string
  jobTitle: string
  description: string
  email?: string
}
</script>
