<Section name='blog' sectionClass='bg-white dark:bg-gray-900 py-0'>
  {#if image}
    <img class="max-w-2xl mx-auto mb-8" src={image} alt={article.image.title}/>
  {/if}

  <BlogTemplate blog={article} />
  <hr class="max-w-2xl mx-auto my-8"/>

  <Section name="comment" sectionClass="comments not-format" divClass="px-0">
    <Comment title={`${commentsTitle} (${comments.length})`}>
      <form use:form class="mb-6">
        {#if $data.reply_to}
          <Badge dismissable class="mb-4" color="dark" on:close={() => setReplyTo(undefined)}>
            @{comments.find(c => c.id === $data.reply_to)?.name}
          </Badge>
        {/if}

        <TextField 
          name="email" 
          placeholder="john@example.com" 
          label={emailLabel}
          errors={!!$touched.email && $errors.email}
          bind:value={$data.email}/>

        <TextField 
          name="name" 
          placeholder="John Doe" 
          label={nameLabel}
          errors={!!$touched.name && $errors.name}
          bind:value={$data.name}/>

        <TextField 
          multiline 
          classes="resize-none mb-4 h-40" 
          name="content" 
          label={messageLabel}
          errors={!!$touched.message && $errors.message}
          bind:value={$data.message}/>

        <Button class="mb-4" type="submit" disabled={!formIsValid}>
          {#if $isSubmitting}<Spinner class="mr-3" size="4" color="white"/>{/if}
          {submitLabel}
        </Button>

        {#if !$isSubmitting && alert.message}
          <Alert color={alert.type === "error" ? "red" : "green"}>{alert.message}</Alert>
        {/if}
      </form>

      <hr class="max-w-2xl mx-auto my-8"/>

      {#each comments as comment}
        <CommentItem comment={comment}>
          <Button outline slot="reply" size="xs" on:click={() => setReplyTo(comment.id)}>
            {replyLabel}
          </Button>
        </CommentItem>
      {/each}
    </Comment>
  </Section>
</Section>

<script lang="ts">
import { onMount } from "svelte"
import { createForm, FelteSubmitError } from "felte"
import * as yup from "yup"
import { validator } from "@felte/validator-yup"
import dayjs from "dayjs"
import LocalizedFormat from "dayjs/plugin/localizedFormat"
import Button from "flowbite-svelte/Button.svelte"
import Spinner from "flowbite-svelte/Spinner.svelte"
import Badge from "flowbite-svelte/Badge.svelte"
import { Section, BlogTemplate, Comment, CommentItem } from 'flowbite-svelte-blocks'
import { CommentStatus, type Comment as CommentData } from "@/models/Comment.d"
import { fetchCommentsByArticleID, submitArticleComment } from "@/services/directus"
import TextField from "@/components/TextField.svelte"
import Alert from "flowbite-svelte/Alert.svelte";

interface Notification {
  type: "success" | "error",
  message: string | null
}

export let article: BlogTemplate["blog"]
export let language: string
export let commentsTitle: string
export let nameLabel: string
export let emailLabel: string
export let messageLabel: string
export let replyLabel: string
export let submitLabel: string
export let successMessage: string
export let errorMessage: string

let comments: CommentData[] = []
let formIsValid = false

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  content: yup.string().required()
})

let alert: Notification = {
  type: "success",
  message: null
}

const { form, data, touched, errors, isSubmitting } = createForm({
  extend: validator({ schema }),
  onSubmit: (values: CommentData, context: any) => {
    values.article = article.directus_id
    values.status = CommentStatus.REVIEW
    submitArticleComment(values)
  },
  onSuccess: async (_: Response): Promise<void> => {
    alert.type = "success"
    alert.message = successMessage
  },
  onError: async(error: FelteSubmitError): Promise<void> => {
    alert.type = "error"
    alert.message = await error.response.text() ?? errorMessage
  }
} as any)

$: image = article.image ? (() => {
  const extension = article.image.filename_disk.split(".").pop()
  const image_name = article.image.title.toLowerCase().replace(" ", "-") + "." + extension
  return `${import.meta.env.PUBLIC_URL}/assets/${article.image.filename_disk}/${image_name}`
})() : undefined

$: {
  schema.isValid($data).then(result => formIsValid = result)
}

function setReplyTo(comment_id?: number) {
  const textarea = document.querySelector("textarea")
  $data.reply_to = comment_id

  if (textarea) {
    const rect = textarea.getBoundingClientRect()
    const isVisibleOnScreen = (
      rect.bottom >= 0 &&
      rect.right >= 0 && 
      rect.left <= document.documentElement.clientWidth &&
      rect.top <= document.documentElement.clientHeight
    )

    if (!isVisibleOnScreen) {
      scrollTo({ top: textarea.getBoundingClientRect().top, behavior: "smooth" })
    }

    textarea.focus()
  }
}

onMount(async () => {
  comments = await fetchCommentsByArticleID(article.directus_id) ?? []

  if (comments.length) {
    comments = Object.values(comments.reduce((map, comment) => {
      dayjs.extend(LocalizedFormat)
      comment.date = dayjs(comment.date_created).locale(language).format("LL")
      comment.commenter = { name: comment.name }

      if (comment.reply_to) {
        if (!Array.isArray(map[comment.reply_to]?.replies)) {
          map[comment.reply_to].replies = [comment]
        } else {
          map[comment.reply_to].replies?.push(comment)
        }
      } else {
        map[comment.id] = comment
      }

      return map
    }, {} as { [key: string]: any }))
  }
})
</script>

<style global lang="postcss">
article {
  @apply max-w-3xl;

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

.comments img {
  @apply hidden;
}

/* BUG: The reply slot currently only works for top-level comments. Nested comments still render
default Reply button, so we have to hide it here */
.comments button:not(.rounded-lg) {
  @apply hidden;
}
</style>
