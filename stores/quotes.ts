import type { Quote } from '~/types'

const ALL_CATEGORIES_TAG = 'All'

export const useQuoteStore = defineStore('quotes', () => {
  const quotes: Ref<Quote[]> = ref([])

  const fetchQuotes = async () => {
    if (quotes.value.length > 0)
      return true

    quotes.value = await useQuotes()

    return true
  }

  const highlightedQuote = (date: ref<Date> = new Date()) => {
    const higlightedQuoteIdx = toDayOfYear(date.value) % quotes.value.length

    return quotes.value[higlightedQuoteIdx]
  }

  const activeCategory = ref(ALL_CATEGORIES_TAG)
  const categories = computed(() => {
    return [
      ALL_CATEGORIES_TAG,
      ...new Set(
        quotes.value.flatMap((quote: Quote) => quote.categories ? quote.categories : []).sort(),
      ),
    ]
  })

  const quotesForCategory: Ref<Quote[]> = computed(() => {
    return activeCategory.value === ALL_CATEGORIES_TAG
      ? quotes.value
      : quotes.value.filter((quote: Quote) =>
        quote.categories?.includes(activeCategory.value),
      )
  })

  return {
    quotes,
    quotesForCategory,
    categories,
    activeCategory,
    highlightedQuote,
    fetchQuotes,
  }
})
