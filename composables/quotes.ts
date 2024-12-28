import type { Quote, RawQuote, RawReference } from '~/types'
import { hydrateQuotes } from '~/shared/quotes'

async function useRawQuotes(): Promise<RawQuote[]> {
  return await queryContent<RawQuote>('/quotes')
    .sort({ uuid: 1 })
    .find()
}

export async function useRawReferences(): Promise<RawReference[]> {
  return await queryContent<RawReference>('/references')
    .sort({ uuid: 1 })
    .find()
}

export async function useQuotes(): Promise<Quote[]> {
  const [rawQuotes, rawReferences] = await Promise.all([
    useRawQuotes(),
    useRawReferences(),
  ])

  return hydrateQuotes(rawQuotes, rawReferences)
}
