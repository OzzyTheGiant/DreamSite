<Toast
  id="notification"
  class="fixed shadow-lg border-2 border-gray-100 dark:border-gray-700"
  position="bottom-right"
  color={getNotificationColor(notification.get()?.type ?? NotificationStatus.INFO)}
  bind:open>
  <Fa slot="icon" icon={getNotificationIcon(notification.get()?.type ?? NotificationStatus.INFO)}/>
  {notification.get()?.message}
</Toast>

<script lang="ts">
import Toast from "flowbite-svelte/Toast.svelte"
import Fa from "svelte-fa"
import { faCircleExclamation, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { faCheck, faInfo, type IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { NotificationStatus, $notification as notification } from "@/store/notification"

let open = false

function getNotificationColor(type: NotificationStatus): Toast["color"] {
  switch(type) {
    case "success": return "green"
    case "error": return "red"
    case "warning": return "yellow"
    case "info": default: return "blue"
  }
}

function getNotificationIcon(type: NotificationStatus): IconDefinition {
  switch(type) {
    case "success": return faCheck
    case "error": return faCircleExclamation
    case "warning": return faTriangleExclamation
    case "info": default: return faInfo
  }
}

notification.subscribe(value => {
  if (!value) return
  open = true
  setTimeout(() => open = false, 5000)  
})
</script>

<style global>
#notification {
  z-index: 1000;
}
</style>
