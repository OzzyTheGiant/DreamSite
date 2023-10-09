<Section name="contact">
  <Contact>
    <svelte:fragment slot="h2">{title}</svelte:fragment>
    <svelte:fragment slot="paragraph">{description}</svelte:fragment>

    <form use:form class="space-y-8" action="/api/message.php" method="post">
      <input type="text" class="hidden" name="honeypot" tabindex="-1" autocomplete="off">

      <TextField
        required
        name="name"
        placeholder="John Doe"
        label={nameLabel}
        errors={!!$touched.name && $errors.name}
        bind:value={$data.name}
        icon={faUser}/>

      <TextField
        required
        name="email" 
        placeholder="john@example.com"
        label={emailLabel}
        errors={!!$touched.email && $errors.email}
        bind:value={$data.email}
        icon={faEnvelope}/>

      <TextField
        required
        name="phone" 
        placeholder="(123) 456 7890"
        label={phoneLabel}
        errors={!!$touched.phone && $errors.phone}
        bind:value={$data.phone}
        icon={faPhone}/>

      <TextField
        required
        multiline
        name="message" 
        classes="resize-none h-32"
        label={messageLabel}
        errors={!!$touched.message && $errors.message}
        bind:value={$data.message}/>

      <Button type="submit" disabled={!formIsValid}>
        {#if $isSubmitting}<Spinner class="mr-3" size="4" color="white"/>{/if}
        {buttonText}
      </Button>

      {#if !$isSubmitting && alert.message}
        <Alert color={alert.type === "error" ? "red" : "green"}>{alert.message}</Alert>
      {/if}
    </form>
  </Contact>
</Section>

<script lang="ts">
import { createForm, FelteSubmitError } from "felte"
import * as yup from "yup"
import { validator } from "@felte/validator-yup"
import { faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons"
import Section from 'flowbite-svelte-blocks/Section.svelte'
import Contact from "flowbite-svelte-blocks/contact/Contact.svelte"
import Alert from "flowbite-svelte/Alert.svelte"
import Button from "flowbite-svelte/Button.svelte"
import Spinner from "flowbite-svelte/Spinner.svelte"
import TextField from "@/components/TextField.svelte"

interface Notification {
  type: "success" | "error",
  message: string | null
}

export let title: string
export let description: string
export let nameLabel: string
export let phoneLabel: string
export let emailLabel: string
export let messageLabel: string
export let buttonText: string

let formIsValid = false

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    message: yup.string().required()
})

let alert: Notification = {
    type: "success",
    message: null
}

const { form, data, touched, errors, isSubmitting } = createForm({
  extend: validator({ schema }),
  onSuccess: async (response: Response): Promise<void> => {
    alert.type = "success"
    alert.message = await response.text()
  },
  onError: async(error: FelteSubmitError): Promise<void> => {
    alert.type = "error"
    alert.message = await error.response.text()
  }
} as any)

$: {
  schema.isValid($data).then(result => formIsValid = result)
}

$: {
  // Update state for each field to mark them as "touched" 
  // if current data different from initial data
  for (const key of Object.keys($data)) {
    if ($data[key]) $touched[key] = true
  }
}
</script>
