import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface PostPreview extends ParsedContent {
  uuid: string
  title: string
  summary: string
  featured_image: string
  author: string
  createdDate: Date
}
