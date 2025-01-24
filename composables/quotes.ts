import type { Quote, RawQuote, RawReference } from '~/types'
import { hydrateQuotes } from '~/shared/quotes'

async function useRawQuotes(): Promise<RawQuote[]> {
  return await queryCollection('quotes')
    .order('uuid', 'DESC')
    .all()
}

export async function useRawReferences(): Promise<RawReference[]> {
  return await queryCollection('references')
    .order('uuid', 'DESC')
    .all()
}

export async function useQuotes(): Promise<Quote[]> {
  const [rawQuotes, rawReferences] = await Promise.all([
    useRawQuotes(),
    useRawReferences(),
  ])

  return hydrateQuotes(rawQuotes, rawReferences)
}
