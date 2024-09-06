import fs from 'node:fs'
import { SitemapStream, streamToPromise } from 'sitemap'
import { serverQueryContent } from '#content/server'
import { hydrateQuotes } from '~/utils/utils'
import type { RawQuote, RawReference } from '~/types'

function getPDFs() {
  return fs.readdirSync('public/uploads/').filter((file) => {
    return file.endsWith('.pdf')
  })
}

async function getReferencePaths(event: any) {
  const rawReferences = await serverQueryContent<RawReference>(event, 'references').find()
  const rawQuotes = await serverQueryContent<RawQuote>(event, 'quotes').find()

  const quotes = hydrateQuotes(rawQuotes, rawReferences)

  const authorSlugs = Array.from(new Set(quotes.map(quote => quote.reference?.authorSlug).filter(Boolean)))
  const referenceSlugs = Array.from(new Set(quotes.map(quote => quote.reference?.referenceSlug).filter(Boolean)))

  return { authorSlugs, referenceSlugs }
}

export default defineEventHandler(async (event) => {
  const posts = await serverQueryContent(event, 'posts').find()
  const collections = await serverQueryContent(event, 'collections').find()
  const { authorSlugs, referenceSlugs } = await getReferencePaths(event)

  const pdfFiles = getPDFs()

  const sitemap = new SitemapStream({
    hostname: 'https://thegoodland.io',
  })

  sitemap.write({
    url: '/',
    changefreq: 'daily',
  })

  sitemap.write({
    url: '/posts',
    changefreq: 'daily',
  })

  for (const post of posts) {
    sitemap.write({
      url: `/posts/${post.slug}`,
      changefreq: 'monthly',
    })
  }

  for (const collection of collections) {
    sitemap.write({
      url: `/collections/${collection.slug}`,
      changefreq: 'weekly',
    })
  }

  for (const authorSlug of authorSlugs) {
    sitemap.write({
      url: `/quotes/authors/${authorSlug}`,
      changefreq: 'monthly',
    })
  }

  for (const referenceSlug of referenceSlugs) {
    sitemap.write({
      url: `/quotes/references/${referenceSlug}`,
      changefreq: 'monthly',
    })
  }

  for (const pdf of pdfFiles) {
    sitemap.write({
      url: `/uploads/${pdf}`,
      changefreq: 'monthly',
    })
  }

  sitemap.end()

  return streamToPromise(sitemap)
})
