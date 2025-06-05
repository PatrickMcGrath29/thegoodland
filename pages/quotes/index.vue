<script setup lang="ts">
import type { Quote, Reference, TextLink } from '~/types'
import { getHighlightedQuote } from '~/shared/quotes'
import { authorSlug, referenceSlug } from '~/shared/utils'

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

useSeoMeta({
  title: 'The Good Land — Quotes',
})
</script>

<template>
  <Container>
    <PageHeader heading="All Quotes" />

    <StyledCard class="mt-10 mb-8" highlighted-state="active">
      <div class="p-4 md:p-8">
        <h2 class="text-xl mb-7 text-center font-semibold">
          Quote of the Day
        </h2>
        <ClientOnly>
          <QuoteText :quote="highlightedQuote" />
        </ClientOnly>
      </div>
    </StyledCard>

    <QuoteDropdownExplorer class="mb-8" />

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
