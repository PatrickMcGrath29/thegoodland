import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface Post extends ParsedContent {
  uuid: string
  slug: string
  path: string
  title: string
  summary?: string
  featuredImage: string
  createdDate: Date
  author: string
}

export interface Collection extends ParsedContent {
  uuid: string
  slug: string
  path: string
  name: string
  author: string
  posts: string[]
}
