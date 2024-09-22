<script setup lang="ts">
import type { Quote } from '~/types'

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

const { params: { id } } = useRoute()

const quotesForReference = computed(() => {
  return quotes.value.filter((quote) => {
    return quote.reference?.referenceSlug === id
  })
})

const reference = computed(() => quotesForReference.value[0]?.reference?.referenceName)

useSeoMeta({
  title: `${reference.value} Quotes`,
  description: `Quotes from ${reference.value}`,
  ogDescription: `Quotes from ${reference.value}`,
})
</script>

<template>
  <Container>
    <QuoteHeader :heading="reference" />

    <ColumnView class="gap-6" :count="quotesForReference.length">
      <div v-for="(quote, idx) in quotesForReference" :key="idx" class="inline-block mb-6">
        <StyledCard>
          <div class="p-6">
            <QuoteText :quote="quote" />
          </div>
        </StyledCard>
      </div>
    </ColumnView>
  </Container>
</template>
