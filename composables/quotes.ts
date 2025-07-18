import type { QuotesCollectionItem, ReferencesCollectionItem } from '@nuxt/content'
import type { Quote } from '~/types'
import { hydrateQuotes } from '~/shared/quotes'

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
