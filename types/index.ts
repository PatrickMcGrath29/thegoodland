import type { ParsedContent } from '@nuxt/content'

export interface RawQuote extends ParsedContent {
  uuid: string
  text: string
  referenceId: string
  categories: string[]
  link?: string
}

export interface Post extends ParsedContent {
  uuid: string
  slug: string
  title: string
  isBlogPost: boolean
  summary?: string
  featuredImage?: string
  createdDate: Date
  author?: string
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

export interface Quote {
  uuid: string
  text: string
  reference?: Reference
  categories: string[]
  link?: string
  slug: string
}

export interface Reference {
  uuid: string
  referenceName?: string
  authorName?: string
  link?: string
  authorSlug?: string
  referenceSlug?: string
}
