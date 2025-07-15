import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: 'posts/*.md',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        isBlogPost: z.boolean().optional(),
        createdDate: z.string().optional(),
        author: z.string().optional(),
        featuredImage: z.string().optional(),
        collections: z.array(z.string()).optional(),
      })
    }),

    quotes: defineCollection({
      type: 'data',
      source: 'quotes/*.md',
      schema: z.object({
        uuid: z.string(),
        text: z.string(),
        categories: z.array(z.string()).optional(),
        reference: z.string().optional(),
        createdDate: z.string().optional(),
      })
    }),

    references: defineCollection({
      type: 'data',
      source: 'references/*.md',
      schema: z.object({
        uuid: z.string(),
        slug: z.string().optional(),
        name: z.string().optional(),
        author: z.string().optional(),
        authorSlug: z.string().optional(),
      })
    }),

    collections: defineCollection({
      type: 'page',
      source: 'collections/*.md',
      schema: z.object({
        slug: z.string(),
        name: z.string(),
        posts: z.array(z.object({
          post: z.string()
        })).optional(),
        featuredImage: z.string().optional(),
      })
    }),

    pages: defineCollection({
      type: 'page',
      source: 'pages/*.md'
    }),

    authors: defineCollection({
      type: 'data',
      source: 'authors/*.md',
      schema: z.object({
        slug: z.string(),
        name: z.string().optional(),
      })
    }),

    categories: defineCollection({
      type: 'data',
      source: 'categories/*.md',
      schema: z.object({
        slug: z.string(),
        name: z.string().optional(),
      })
    })
  }
})
