import type { Quote, RawQuote, RawReference } from '~/types'
import { hydrateQuotes } from '~/shared/quotes'

async function useRawQuotes(): Promise<RawQuote[]> {
  return await queryCollection<RawQuote>('quotes')
    .sort({ createdDate: -1, uuid: 1 })
    .all()
}

export async function useRawReferences(): Promise<RawReference[]> {
  return await queryCollection<RawReference>('references')
    .all()
}

export async function useQuotes(): Promise<Quote[]> {
  const [rawQuotes, rawReferences] = await Promise.all([
    useRawQuotes(),
    useRawReferences(),
  ])

  return hydrateQuotes(rawQuotes, rawReferences)
}
