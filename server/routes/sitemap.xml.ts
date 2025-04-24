import type { Quote, RawQuote, RawReference } from '~/types'
import fs from 'node:fs'
import { serverQueryContent } from '#content/server'
import { SitemapStream, streamToPromise } from 'sitemap'
import { hydrateQuotes } from '~/shared/quotes'

function getPDFs() {
  return fs.readdirSync('public/uploads/').filter((file) => {
    return file.endsWith('.pdf')
  })
}

async function getHydratedQuotes(event: any): Promise<Quote[]> {
  const rawReferences = await serverQueryContent<RawReference>(event, 'references').find()
  const rawQuotes = await serverQueryContent<RawQuote>(event, 'quotes').find()

  return hydrateQuotes(rawQuotes, rawReferences)
}

function getQuotePaths(quotes: Quote[]) {
  const authorSlugs = Array.from(new Set(quotes.map(quote => quote.reference?.authorSlug).filter(Boolean)))
  const referenceSlugs = Array.from(new Set(quotes.map(quote => quote.reference?.referenceSlug).filter(Boolean)))

  return { authorSlugs, referenceSlugs }
}

export default defineEventHandler(async (event) => {
  const posts = await serverQueryContent(event, 'posts').find()
  const collections = await serverQueryContent(event, 'collections').find()

  const hydratedQuotes = await getHydratedQuotes(event)
  const { authorSlugs, referenceSlugs } = getQuotePaths(hydratedQuotes)

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

  sitemap.write({
    url: '/collections',
    changefreq: 'daily',
  })

  for (const collection of collections) {
    sitemap.write({
      url: `/collections/${collection.slug}`,
      changefreq: 'weekly',
    })
  }

  sitemap.write({
    url: '/quotes',
    changefreq: 'daily',
  })

  for (const authorSlug of authorSlugs) {
    sitemap.write({
      url: `/quotes/author/${authorSlug}`,
      changefreq: 'monthly',
    })
  }

  for (const referenceSlug of referenceSlugs) {
    sitemap.write({
      url: `/quotes/reference/${referenceSlug}`,
      changefreq: 'monthly',
    })
  }

  for (const quote of hydratedQuotes) {
    sitemap.write({
      url: `/quotes/${quote.uuid}/${quote.slug}`,
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
