export interface Post {
  uuid: string
  slug: string
  title: string
  isBlogPost: boolean
  summary?: string
  featuredImage?: string
  createdDate: Date
  author?: string
}

export interface Collection {
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
  categories?: string[]
  link?: string
  slug: string
  createdDate?: string
}

export interface Reference {
  uuid: string
  referenceName?: string
  authorName?: string
  link?: string
  authorSlug?: string
  referenceSlug?: string
}

export interface TextLink {
  text: string
  textSubtitle?: string
  onSelect?: () => void
}

export interface BreadCrumb {
  text: string
  link?: string
}

export interface QuoteCategoryMetadata {
  name: string
  slug: string
  count: number
}

export interface QuoteAuthorMetadata {
  name: string
  slug: string
  count: number
}

export interface QuoteReferenceMetadata {
  referenceName: string
  authorName: string
  slug: string
  count: number
}
