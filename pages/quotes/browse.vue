<script setup lang="ts">
import type { Quote } from '~/types'

const PAGE_SIZE = 25

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

const pageNumber = ref<number>(0)

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
  title: 'Browse All Quotes — The Good Land',
  description: 'Browse all quotes in our collection.',
})
</script>

<template>
  <Container>
    <PageHeader
      heading="Browse All Quotes"
      subtitle="Quotes"
      :bread-crumbs="[{ text: 'Quotes', link: '/quotes' }]"
    />

    <div class="mb-8 text-center text-neutral-400">
      Showing {{ pageNumber * PAGE_SIZE + 1 }} - {{ Math.min((pageNumber + 1) * PAGE_SIZE, quotes.length) }} of {{ quotes.length }} quotes
    </div>

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

    <div v-if="pageCount > 1" class="join flex justify-center my-8">
      <button
        v-for="(page, idx) in Array(pageCount).keys()"
        :key="idx"
        class="join-item btn"
        :class="{ 'btn-active': page === pageNumber }"
        @click="pageNumber = page"
      >
        {{ page + 1 }}
      </button>
    </div>
  </Container>
</template>
