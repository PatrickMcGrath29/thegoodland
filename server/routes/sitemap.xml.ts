import fs from 'node:fs'
import { SitemapStream, streamToPromise } from 'sitemap'
import { serverQueryContent } from '#content/server'

function getPDFs() {
  return fs.readdirSync('public/uploads/').filter((file) => {
    return file.endsWith('.pdf')
  })
}

export default defineEventHandler(async (event) => {
  const posts = await serverQueryContent(event, 'posts').find()
  const collections = await serverQueryContent(event, 'collections').find()
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

  for (const pdf of pdfFiles) {
    sitemap.write({
      url: `/uploads/${pdf}`,
      changefreq: 'monthly',
    })
  }

  sitemap.end()

  return streamToPromise(sitemap)
})
