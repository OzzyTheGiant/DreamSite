<Section name='blog' classSection='pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900'>
    <BlogTemplate blog={article} />

    <Section name='comment' classSection='not-format' classDiv="px-0">
      <Comment title="Discussion (20)">
        <form class="mb-6">
          <Label for="comment" class="sr-only">Your comment</Label>
          <Textarea id="comment" rows="6" class="mb-4"
              placeholder="Write a comment..." required>
          </Textarea>
          <Button type="submit" class="px-4 text-xs font-medium">
            Post comment
          </Button>
        </form>

        {#each comments as comment, i}
          <CommentItem {comment} articleClass ={ i !== 0 ? 'border-t':''}>
            <svelte:fragment slot="dropdownMenu">
              <DotsHorizontalOutline class="dots-menu dark:text-white" />
              <Dropdown triggeredBy=".dots-menu">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Remove</DropdownItem>
                <DropdownItem>Report</DropdownItem>
              </Dropdown>
            </svelte:fragment>
          </CommentItem>
        {/each}
      </Comment>
    </Section>
</Section>

<script lang="ts">
import { Section, BlogTemplate, Comment, CommentItem } from 'flowbite-svelte-blocks'
import { Button, Textarea, Label, Dropdown, DropdownItem } from 'flowbite-svelte'
import { DotsHorizontalOutline } from 'flowbite-svelte-icons'
import { type Article as ArticleData } from "@/components/ArticleList.svelte"

export let article: Required<ArticleData>

const comments = [
  {
    id: "comment1",
    commenter: {
      name: "Michael Gough",
      profilePicture: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
    },
    date: "Feb. 8, 2022",
    content: "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
    replies: [
      {
        id: "reply1",
        commenter: {
          name: "Jese Leos",
          profilePicture: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
        },
        date: "Feb. 12, 2022",
        content: "Much appreciated! Glad you liked it ☺️",
      },
    ],
  },
  {
    id: "comment2",
    commenter: {
      name: "Bonnie Green",
      profilePicture: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
    },
    date: "Mar. 12, 2022",
    content: "The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design strategy.",
    replies: [],
  },
  {
    id: "comment3",
    commenter: {
      name: "Helene Engels",
      profilePicture: "https://flowbite.com/docs/images/people/profile-picture-4.jpg",
    },
    date: "Jun. 23, 2022",
    content: "Thanks for sharing this. I do came from the Backend development and explored some of the tools to design my Side Projects.",
    replies: [],
  },
  // Add more comments and replies here
];
</script>

<style global lang="postcss">
article {
  p, h1, h2, h3, h4, h5, h6 {
    @apply text-gray-800 my-4;
  }

  *:not(address) {
    p, a {
      @apply my-0;
    }
  }


  h2 {
    @apply text-2xl;
  }

  h3, h4, h5, h6 {
    @apply text-xl;
  }

  ul {
    @apply list-disc pl-8;
  }

  ol {
    @apply list-decimal;
    @apply pl-8;
  }
}

.dark article {
  p, h2, ul, ol, h1, h2, h3, h4, h5, h6, div {
    @apply text-gray-300;
  }
}
</style>
