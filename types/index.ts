import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface Post extends ParsedContent {
  uuid: string
  slug: string
  title: string
  summary?: string
  featuredImage: string
  createdDate: Date
  author: string
}

export interface Collection extends ParsedContent {
  uuid: string
  slug: string
  name: string
  author: string
  summary: string
  posts: string[]
  featuredImage: string
}
