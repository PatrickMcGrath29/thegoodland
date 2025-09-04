import type { QuotesCollectionItem, ReferencesCollectionItem } from '@nuxt/content'
import type { Quote, Reference } from '../types'
import { authorSlug, referenceSlug, slugify, smartEllipsis } from './utils'

function parseQuote(rawQuote: QuotesCollectionItem): QuotesCollectionItem {
  return {
    ...rawQuote,
    uuid: rawQuote.uuid?.toLowerCase(),
    referenceId: rawQuote.referenceId?.toLowerCase(),
    createdDate: rawQuote.createdDate,
  }
}

function parseReference(rawReference: ReferencesCollectionItem): ReferencesCollectionItem {
  return {
    ...rawReference,
    uuid: rawReference.uuid?.toLowerCase(),
  }
}

function quoteSlug(authorName: string | undefined, quoteText: string): string {
  const parts = [
    authorName,
    smartEllipsis(quoteText, 30),
  ].filter(Boolean).join('-')

  return slugify(parts)
}

function buildQuote(rawQuote: QuotesCollectionItem, rawReference: ReferencesCollectionItem | undefined): Quote {
  const slugForQuote = quoteSlug(rawReference?.authorName, rawQuote.text)

  const quote: Quote = {
    slug: slugForQuote,
    ...rawQuote,
  }

  if (!rawReference)
    return quote

  const reference: Reference = {
    ...rawReference,
    ...(rawReference.authorName && {
      authorSlug: authorSlug(rawReference.authorName),
    }),
    ...(rawReference.authorName && rawReference.referenceName && {
      referenceSlug: referenceSlug(rawReference.authorName, rawReference.referenceName),
    }),
  }

  return {
    ...quote,
    reference,
  }
}

export function hydrateQuotes(rawQuotes: QuotesCollectionItem[], rawReferences: ReferencesCollectionItem[]): Quote[] {
  const quotes = rawQuotes.map(parseQuote)
  const references = rawReferences.map(parseReference)

  const referencesById: Map<string, ReferencesCollectionItem> = new Map(
    references.map((reference: ReferencesCollectionItem) => [reference.uuid, reference]),
  )

  return quotes.map((quote: QuotesCollectionItem): Quote => {
    const reference = referencesById.get(quote.referenceId)
    return buildQuote(quote, reference)
  })
}
