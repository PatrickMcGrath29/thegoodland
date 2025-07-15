import { queryCollection } from '@nuxt/content/nitro'
import { SitemapStream, streamToPromise } from 'sitemap'

export default defineEventHandler(async (event) => {
  // Create a stream to write to
  const sitemap = new SitemapStream({
    hostname: useRuntimeConfig().public.baseUrl,
  })

  const rawReferences = await queryCollection(event, 'references').all()
  const rawQuotes = await queryCollection(event, 'quotes').all()

  sitemap.write({
    url: '/',
    changefreq: 'monthly',
  })

  sitemap.write({
    url: '/quotes',
    changefreq: 'monthly',
  })

  sitemap.write({
    url: '/posts',
    changefreq: 'monthly',
  })

  const posts = await queryCollection(event, 'posts').all()
  const collections = await queryCollection(event, 'collections').all()

  // Add posts to sitemap
  for (const post of posts) {
    sitemap.write({
      url: post.path,
      changefreq: 'monthly',
    })
  }

  // Add collections to sitemap
  for (const collection of collections) {
    sitemap.write({
      url: collection.path,
      changefreq: 'monthly',
    })
  }

  const authors = rawReferences.map(ref => ref.slug).filter(Boolean)
  const categories = [...new Set(rawQuotes.flatMap(quote => quote.categories || []))]

  // Add author pages to sitemap
  for (const author of authors) {
    sitemap.write({
      url: `/quotes/author/${author}`,
      changefreq: 'monthly',
    })
  }

  // Add category pages to sitemap
  for (const category of categories) {
    sitemap.write({
      url: `/quotes/category/${category}`,
      changefreq: 'monthly',
    })
  }

  // Close sitemap stream
  sitemap.end()

  const sitemapOutput = await streamToPromise(sitemap)

  event.node.res.setHeader('content-type', 'application/xml')
  event.node.res.end(sitemapOutput)
})
