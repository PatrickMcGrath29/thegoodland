<script setup lang="ts">
import type { Quote, Reference, TextLink } from '~/types'
import { getHighlightedQuote } from '~/shared/quotes'
import { authorSlug, normalizeInput, referenceSlug } from '~/shared/utils'

const PAGE_SIZE = 2500

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

const pageNumber = ref<number>(0)

const highlightedQuote = computed(() => {
  return getHighlightedQuote(quotes)
})

const pageCount = computed(() => Math.ceil(quotes.value.length / PAGE_SIZE))
const pageQuotes = computed(() => {
  return quotes.value.slice(
    pageNumber.value * PAGE_SIZE,
    (pageNumber.value + 1) * PAGE_SIZE,
  )
})

watch(pageNumber, (_old, _new) => {
  window.scrollTo({
    top: 0,
  })
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
        onSelect: () => navigateTo(`/quotes/author/${authorSlug(author)}`),
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

  const referenceLinks = references.map(
    (reference) => {
      const slug = referenceSlug(reference.authorName, reference.referenceName as string)
      const link: TextLink = {
        text: reference.referenceName as string,
        textSubtitle: reference.authorName ? `by ${reference.authorName}` : undefined,
        onSelect: () => navigateTo(`/quotes/reference/${slug}`),
      }

      return link
    },
  )
  const uniqueReferenceLinks = referenceLinks.filter((link, index, self) =>
    index === self.findIndex(l => l.text === link.text && l.textSubtitle === link.textSubtitle),
  )

  return uniqueReferenceLinks.sort()
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

    <div class="mb-10 flex flex-wrap gap-3 flex-col sm:flex-row">
      <ContentOverlayPanel button-text="Authors" :content-records="authors" />
      <ContentOverlayPanel button-text="Literature" :content-records="references" />
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
