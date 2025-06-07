import type { Ref } from 'vue'
import type { Quote, RawQuote, RawReference, Reference } from '../types'
import { authorSlug, dayOfYear, referenceSlug, slugify, smartEllipsis } from './utils'

function parseQuote(rawQuote: RawQuote): RawQuote {
  return {
    ...rawQuote,
    uuid: rawQuote.uuid?.toLowerCase(),
    referenceId: rawQuote.referenceId?.toLowerCase(),
    createdDate: rawQuote.createdDate,
  }
}

function parseReference(rawReference: RawReference): RawReference {
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

function buildQuote(rawQuote: RawQuote, rawReference: RawReference | undefined): Quote {
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

export function hydrateQuotes(rawQuotes: RawQuote[], rawReferences: RawReference[]): Quote[] {
  const quotes = rawQuotes.map(parseQuote)
  const references = rawReferences.map(parseReference)

  const referencesById: Map<string, RawReference> = new Map(
    references.map((reference: RawReference) => [reference.uuid, reference]),
  )

  return quotes.map((quote: RawQuote): Quote => {
    const reference = referencesById.get(quote.referenceId)
    return buildQuote(quote, reference)
  })
}

export function getHighlightedQuote(quotes: Ref<Quote[]>) {
  const higlightedQuoteIdx = dayOfYear() % quotes.value.length

  return quotes.value[higlightedQuoteIdx]
}
