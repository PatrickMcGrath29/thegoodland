import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    collections: defineCollection({
      source: 'collections/*.md',
      type: 'page',
      schema: z.object({
        slug: z.string(),
        name: z.string(),
        author: z.string().optional(),
        summary: z.string().optional(),
        posts: z.array(z.object({ post: z.string() })),
        featuredImage: z.string().optional(),
      }),
    }),
    posts: defineCollection({
      source: 'posts/*.md',
      type: 'page',
      schema: z.object({
        uuid: z.string(),
        slug: z.string(),
        title: z.string(),
        summary: z.string().optional(),
        isBlogPost: z.string(),
        author: z.string().optional(),
        featuredImage: z.string().optional(),
        createdDate: z.date(),
      }),
    }),
    authors: defineCollection({
      source: 'authors/*.md',
      type: 'page',
      schema: z.object({
        uuid: z.string(),
        name: z.string(),
      }),
    }),
    quotes: defineCollection({
      source: 'quotes/*.md',
      type: 'page',
      schema: z.object({
        uuid: z.string(),
        text: z.string(),
        referenceId: z.string(),
        link: z.string().optional(),
      }),
    }),
    references: defineCollection({
      source: 'references/*.md',
      type: 'page',
      schema: z.object({
        uuid: z.string(),
        referenceName: z.string().optional(),
        authorName: z.string().optional(),
      }),
    }),
  },
})
