<script setup lang="ts">
import type { Quote } from '~/types'

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>
</script>

<template>
  <Container>
    <h1 class="text-4xl text-center my-10 font-bold">
      Quotes
    </h1>

    <ColumnView class="gap-6" :count="quotes.length">
      <div v-for="(quote, idx) in quotes" :key="idx" class="inline-block mb-6">
        <StyledCard>
          <div class="p-4">
            <QuoteText :quote="quote" />
          </div>
        </StyledCard>
      </div>
    </ColumnView>
  </Container>
</template>
