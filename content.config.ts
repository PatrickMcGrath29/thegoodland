import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'data',
      source: 'posts/*.md',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        isBlogPost: z.boolean().optional(),
        createdDate: z.string().optional(),
        author: z.string().optional(),
        featuredImage: z.string().optional(),
        collections: z.array(z.string()).optional(),
        uuid: z.string(),
        summary: z.string().optional(),
      }),
    }),

    quotes: defineCollection({
      type: 'data',
      source: 'quotes/*.md',
      schema: z.object({
        uuid: z.string(),
        text: z.string(),
        referenceId: z.string(),
        link: z.string().optional(),
        createdDate: z.string(),
      }),
    }),

    references: defineCollection({
      type: 'data',
      source: 'references/*.md',
      schema: z.object({
        uuid: z.string(),
        referenceName: z.string().optional(),
        authorName: z.string().optional(),
      }),
    }),

    collections: defineCollection({
      type: 'data',
      source: 'collections/*.md',
      schema: z.object({
        slug: z.string(),
        name: z.string(),
        author: z.string().optional(),
        summary: z.string().optional(),
        posts: z.array(z.object({ post: z.string() })),
        featuredImage: z.string().optional(),
      }),
    }),
    authors: defineCollection({
      type: 'data',
      source: 'authors/*.md',
      schema: z.object({
        uuid: z.string(),
        name: z.string(),
      }),
    }),
    categories: defineCollection({
      type: 'data',
      source: 'categories/*.md',
      schema: z.object({
        slug: z.string(),
        name: z.string().optional(),
      }),
    }),
  },
})
