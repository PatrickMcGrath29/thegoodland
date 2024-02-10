import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface Post extends ParsedContent {
  uuid: string
  title: string
  summary: string
  featuredImage: string
  referenceId: string
  createdDate: Date
}
