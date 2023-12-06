import type { Article } from "@/models/Article"

export enum CommentStatus {
  PUBLISHED = "published",
  REVIEW = "review"
}

export interface Comment {
  id: any
  date_created: string
  date?: string
  email: string
  name: string
  content: string
  status: CommentStatus
  article: Article["id"]
  reply_to: number | null
  replies?: Comment[]
  commenter: {
    name: string
    profilePicture?: string
  }
}