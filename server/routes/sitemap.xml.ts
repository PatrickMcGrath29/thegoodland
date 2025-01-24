import fs from 'node:fs'
import { SitemapStream, streamToPromise } from 'sitemap'
import { hydrateQuotes } from '~/shared/quotes'

function getPDFs() {
  return fs.readdirSync('public/uploads/').filter((file) => {
    return file.endsWith('.pdf')
  })
}

async function getReferencePaths(event: any) {
  const rawReferences = await queryCollection(event, 'references').all()
  const rawQuotes = await queryCollection(event, 'quotes').all()

  const quotes = hydrateQuotes(rawQuotes, rawReferences)

  const authorSlugs = Array.from(new Set(quotes.map(quote => quote.reference?.authorSlug).filter(Boolean)))
  const referenceSlugs = Array.from(new Set(quotes.map(quote => quote.reference?.referenceSlug).filter(Boolean)))

  return { authorSlugs, referenceSlugs }
}

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'posts').all()
  const collections = await queryCollection(event, 'collections').all()
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

  for (const pdf of pdfFiles) {
    sitemap.write({
      url: `/uploads/${pdf}`,
      changefreq: 'monthly',
    })
  }

  sitemap.end()

  return streamToPromise(sitemap)
})
