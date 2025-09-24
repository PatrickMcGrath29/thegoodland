import type { QuotesCollectionItem, ReferencesCollectionItem } from '@nuxt/content'
import type { Quote, QuoteAuthorMetadata, QuoteCategoryMetadata, QuoteReferenceMetadata } from '~~/types'
import { hydrateQuotes } from '~~/shared/quotes'
import { dayOfYear, slugify } from '~~/shared/utils'

async function useRawQuotes(): Promise<QuotesCollectionItem[]> {
  return await queryCollection('quotes')
    .order('createdDate', 'DESC')
    .order('uuid', 'ASC')
    .all()
}

export async function useRawReferences(): Promise<ReferencesCollectionItem[]> {
  return await queryCollection('references')
    .all()
}

export async function useQuotes(): Promise<Quote[]> {
  const [rawQuotes, rawReferences] = await Promise.all([
    useRawQuotes(),
    useRawReferences(),
  ])

  return hydrateQuotes(rawQuotes, rawReferences)
}

export function useQuoteCategories(quotes: Quote[]): QuoteCategoryMetadata[] {
  const categories = quotes.map(quote => quote.categories || []).flat()
  const uniqueCategories = [...new Set(categories)]
  return uniqueCategories.map((category) => {
    return {
      name: category,
      slug: `/quotes/category/${slugify(category)}`,
      count: categories.filter(c => c === category).length,
    }
  }).sort((a, b) => a.name.localeCompare(b.name))
}

export function useQuoteAuthors(quotes: Quote[]): QuoteAuthorMetadata[] {
  const authors = quotes.map(quote => quote.reference?.authorName).filter(Boolean) as string[]
  const uniqueAuthors = [...new Set(authors)]
  return uniqueAuthors.map((authorName) => {
    const quote = quotes.find(q => q.reference?.authorName === authorName)

    return {
      name: authorName,
      slug: `/quotes/author/${quote?.reference?.authorSlug}`,
      count: authors.filter(a => a === authorName).length,
    }
  }).sort((a, b) => a.name.localeCompare(b.name))
}

export function useQuoteReferences(quotes: Quote[]): QuoteReferenceMetadata[] {
  const references = quotes
    .filter(quote => quote.reference?.referenceName && quote.reference?.authorName)
    .map(quote => quote.reference!)

  const uniqueReferences = references.reduce((acc, ref) => {
    const key = `${ref.authorName}-${ref.referenceName}`
    if (!acc.has(key)) {
      acc.set(key, ref)
    }
    return acc
  }, new Map())

  return Array.from(uniqueReferences.values()).map((reference) => {
    const quote = quotes.find(q => q.reference?.referenceName === reference.referenceName && q.reference?.authorName === reference.authorName)

    return {
      referenceName: reference.referenceName!,
      authorName: reference.authorName!,
      slug: `/quotes/reference/${quote?.reference?.referenceSlug}`,
      count: references.filter(r =>
        r.authorName === reference.authorName
        && r.referenceName === reference.referenceName,
      ).length,
    }
  }).sort((a, b) => a.referenceName.localeCompare(b.referenceName))
}

export async function getQuoteOfDay(quotes: Quote[]): Promise<Quote> {
  return await consistentHash(
    quotes as [Quote, ...Quote[]],
    (quote: Quote) => {
      return quote.uuid
    },
    dayOfYear(),
  )
}
