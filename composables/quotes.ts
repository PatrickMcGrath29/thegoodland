import type { ParsedContent } from '@nuxt/content'
import type { Quote, Reference } from '~/types'

interface RawQuote extends ParsedContent {
  uuid: string
  text: string
  referenceId: string
  categories: string[]
  link?: string
}

async function useRawQuotes(): Promise<RawQuote[]> {
  const quotes = await queryContent<RawQuote>('/quotes')
    .sort({ uuid: 1 })
    .find()

  return quotes.map((quote) => {
    return {
      ...quote,
      referenceId: quote.referenceId?.toLowerCase(),
      uuid: quote.uuid.toLowerCase(),
    }
  })
}

export function referenceSlug(authorName: string, referenceName: string): string {
  return slugify([
    authorName,
    referenceName,
  ].filter(Boolean).join('-'))
}

export function authorSlug(authorName: string): string {
  return slugify(authorName)
}

export async function useReferences(): Promise<Reference[]> {
  const references = await queryContent('/references')
    .sort({ uuid: 1 })
    .find()

  const toReference = (rawReference: any): Reference => {
    return {
      uuid: rawReference.uuid.toLowerCase(),
      authorName: rawReference.authorName,
      referenceName: rawReference.referenceName,
      link: rawReference.link,
      referenceSlug: referenceSlug(rawReference.authorName, rawReference.referenceName),
      authorSlug: authorSlug(rawReference.authorName),
    }
  }

  return references.map(toReference)
}

export async function useQuotes(): Promise<Quote[]> {
  const [rawQuotes, references] = await Promise.all([
    useRawQuotes(),
    useReferences(),
  ])

  const referencesById: Map<string, Reference> = new Map(
    references.map((reference: Reference) => [reference.uuid, reference]),
  )

  return rawQuotes.map((quote: RawQuote): Quote => {
    const reference = referencesById.get(quote.referenceId)

    const quoteSlugFields = [
      reference?.authorName,
      ...quote.text.split(' ').slice(0, 5),
    ]

    const quoteSlug = slugify(quoteSlugFields.filter(Boolean).join('-'))

    return {
      ...quote,
      slug: quoteSlug,
      reference: referencesById.get(quote.referenceId) as Reference,
    }
  })
}
