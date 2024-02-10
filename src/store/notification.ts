import { atom } from "nanostores"

export enum NotificationStatus {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info"
}

export interface Notification {
  type: NotificationStatus
  message: string
}

export const $notification = atom<Notification | null>(null)

export function error(message: string) {
  $notification.set({ type: NotificationStatus.ERROR, message })
}

export function success(message: string) {
  $notification.set({ type: NotificationStatus.SUCCESS, message })
}

export function warning(message: string) {
  $notification.set({ type: NotificationStatus.WARNING, message })
}

export function info(message: string) {
  $notification.set({ type: NotificationStatus.INFO, message })
}
