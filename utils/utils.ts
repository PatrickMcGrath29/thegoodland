import type { Quote, RawQuote, RawReference, Reference } from '~/types'

export function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
}

export function referenceSlug(authorName: string | undefined, referenceName: string | undefined): string | undefined {
  if (!authorName && !referenceName)
    return undefined

  return slugify([
    authorName,
    referenceName,
  ].filter(Boolean).join('-'))
}

export function authorSlug(authorName: string | undefined): string | undefined {
  if (!authorName)
    return undefined

  return slugify(authorName)
}

export function getPath(record: any): string {
  return record._path.split('/').at(-1) as string
}

export function toDayOfYear(date: Date): number {
  return Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000,
  )
}

export function smartEllipsis(text: string, length: number) {
  if (text.length > length) {
    const index = text.substring(0, length - 1)
    text = `${index.substring(0, index.lastIndexOf(' '))}...`
  }
  return text
}

function parseQuote(rawQuote: RawQuote): RawQuote {
  return {
    ...rawQuote,
    uuid: rawQuote.uuid?.toLowerCase(),
    referenceId: rawQuote.referenceId?.toLowerCase(),
  }
}

function parseReference(rawReference: RawReference): RawReference {
  return {
    ...rawReference,
    uuid: rawReference.uuid?.toLowerCase(),
  }
}

function buildQuote(rawQuote: RawQuote, rawReference: RawReference | undefined): Quote {
  const quoteSlugFields = [
    rawReference?.authorName,
    ...rawQuote.text.split(' ').slice(0, 5),
  ]
  const quoteSlug = slugify(quoteSlugFields.filter(Boolean).join('-'))

  const quote: Quote = {
    slug: quoteSlug,
    ...rawQuote,
  }

  if (!rawReference)
    return quote

  const hasAuthor = rawReference.authorName
  const hasReference = rawReference.authorName && rawReference.referenceName

  const reference: Reference = {
    ...rawReference,
    ...(hasAuthor && { authorSlug: authorSlug(rawReference.authorName) }),
    ...(hasReference && { referenceSlug: referenceSlug(rawReference.authorName, rawReference.referenceName) }),
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
