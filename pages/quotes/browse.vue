<script setup lang="ts">
import type { Quote } from '~/types'

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

useSeoMeta({
  title: 'Browse All Quotes — The Good Land',
  description: 'Browse all quotes in our collection.',
})
</script>

<template>
  <Container>
    <PageHeader heading="Browse All Quotes" subtitle="Quotes" />

    <QuoteDropdownExplorer class="flex justify-center sm:justify-start mb-4" />

    <ColumnView class="gap-6" :count="quotes.length">
      <div v-for="(quote, idx) in quotes" :key="idx" class="inline-block mb-6">
        <StyledCard>
          <div class="p-3 sm:p-4">
            <QuoteTextWithCategories :quote="quote" />
          </div>
        </StyledCard>
      </div>
    </ColumnView>
  </Container>
</template>
