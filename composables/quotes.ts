import type { Quote, RawQuote, RawReference } from '~/types'
import { hydrateQuotes } from '~/shared/quotes'

async function useRawQuotes(): Promise<RawQuote[]> {
  return await queryCollection('quotes')
    .order('createdDate', 'DESC')
    .order('uuid', 'ASC')
    .all()
}

export async function useRawReferences(): Promise<RawReference[]> {
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
