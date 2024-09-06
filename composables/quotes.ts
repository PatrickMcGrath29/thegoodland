import type { Quote, RawQuote, Reference } from '~/types'

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

export async function useReferences(): Promise<Reference[]> {
  const references = await queryContent('/references')
    .sort({ uuid: 1 })
    .find()

  return references.map(parseReference)
}

export function hydrateQuotes(rawQuotes: RawQuote[], references: Reference[]): Quote[] {
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

export async function useQuotes(): Promise<Quote[]> {
  const [rawQuotes, references] = await Promise.all([
    useRawQuotes(),
    useReferences(),
  ])

  return hydrateQuotes(rawQuotes, references)
}
