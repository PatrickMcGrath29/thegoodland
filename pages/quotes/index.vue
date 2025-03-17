<script setup lang="ts">
import type { Quote, Reference, TextLink } from '~/types'
import { getHighlightedQuote } from '~/shared/quotes'
import { authorSlug, normalizeInput, referenceSlug } from '~/shared/utils'

const PAGE_SIZE = 50
const SEARCH_THROTTLE_MS = 250

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

const pageNumber = ref<number>(0)
const searchBarValue: Ref<string> = ref('')
const throttledSearchBarValue = refThrottled(searchBarValue, SEARCH_THROTTLE_MS)

const highlightedQuote = computed(() => {
  return getHighlightedQuote(quotes)
})

const matchingQuotes = computed(() => {
  if (throttledSearchBarValue.value === '')
    return quotes.value

  return quotes.value.filter((quote) => {
    return [
      normalizeInput(quote.text),
      normalizeInput(quote.reference?.authorName),
      normalizeInput(quote.reference?.referenceName),
    ].filter(Boolean).some(text => text.includes(normalizeInput(throttledSearchBarValue.value)))
  })
})

watch(matchingQuotes, (_old, _new) => {
  pageNumber.value = 0
})

const pageCount = computed(() => Math.ceil(matchingQuotes.value.length / PAGE_SIZE))
const pageQuotes = computed(() => {
  return matchingQuotes.value.slice(pageNumber.value * PAGE_SIZE, (pageNumber.value + 1) * PAGE_SIZE)
})

const authors: Ref<TextLink[]> = computed(() => {
  const authors = new Set(
    quotes.value.map(
      quote => quote.reference?.authorName,
    ).filter(
      author => author !== undefined,
    ).sort(),
  )

  const authorLinks = Array.from(authors).map(
    (author) => {
      return {
        text: author,
        link: `/quotes/author/${authorSlug(author)}`,
      }
    },
  )

  return authorLinks
})

const references: Ref<TextLink[]> = computed(() => {
  const references: Reference[] = quotes.value.map(
    quote => quote.reference,
  ).filter(
    reference => reference !== undefined,
  ).filter(
    reference => reference.referenceName,
  )

  const referenceLinks = new Set(
    references.map(
      (reference) => {
        const slug = referenceSlug(reference.authorName, reference.referenceName as string)
        const link: TextLink = {
          text: reference.referenceName as string,
          textSubtitle: reference.authorName ? `by ${reference.authorName}` : undefined,
          link: `/quotes/reference/${slug}`,
        }

        return JSON.stringify(link)
      },
    ),
  )

  return Array.from(referenceLinks).sort().map(link => JSON.parse(link))
})

useSeoMeta({
  title: 'The Good Land — Quotes',
})
</script>

<template>
  <Container>
    <PageHeader heading="All Quotes" subtitle="Quotes" />

    <StyledCard class="my-10" highlighted-state="active">
      <div class="p-4 md:p-8">
        <h2 class="text-xl mb-7 text-center font-semibold">
          Quote of the Day
        </h2>
        <ClientOnly>
          <QuoteText :quote="highlightedQuote" />
        </ClientOnly>
      </div>
    </StyledCard>

    <div class="mb-10 flex flex-wrap gap-3">
      <ContentOverlayPanel button-text="Authors" :content-records="authors" />
      <ContentOverlayPanel button-text="Literature" :content-records="references" />
      <div class="w-full sm:max-w-96">
        <label class="input input-bordered flex items-center gap-2">
          <Icon name="ph:magnifying-glass-duotone" />
          <input v-model="searchBarValue" placeholder="Search...">
        </label>
      </div>
    </div>

    <ColumnView class="gap-6" :count="pageQuotes.length">
      <div v-for="(quote, idx) in pageQuotes" :key="idx" class="inline-block mb-6">
        <StyledCard>
          <div class="p-4">
            <QuoteText :quote="quote" />
          </div>
        </StyledCard>
      </div>
    </ColumnView>

    <div v-if="pageCount > 1" class="join flex justify-center my-5">
      <button
        v-for="(page, idx) in Array(pageCount).keys()"
        :key="idx" class="join-item btn"
        :class="{ 'btn-active': page === pageNumber }"
        @click="pageNumber = page"
      >
        {{ page + 1 }}
      </button>
    </div>
  </Container>
</template>
