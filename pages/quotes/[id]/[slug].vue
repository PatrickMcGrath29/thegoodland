<script setup lang="ts">
import type { Quote } from '~/types'

const { params: { id } } = useRoute()

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

const matchingQuote = computed(() => {
  return quotes.value.find((quote) => {
    return quote.uuid === id
  })
}) as Ref<Quote>

const quotesForAuthor = computed(() => {
  return quotes.value.filter((quote) => {
    return quote.reference?.authorSlug === matchingQuote.value.reference?.authorSlug
      && quote.uuid !== matchingQuote.value.uuid
  })
}) as Ref<Quote[]>
</script>

<template>
  <Container>
    <StyledCard highlighted-state="active" class="my-10">
      <div class="p-6">
        <QuoteText :quote="matchingQuote" :show-perma-link="false" />
      </div>
    </StyledCard>

    <div v-if="quotesForAuthor.length > 1" class="my-14">
      <div class="divider text-xl font-semibold text-center">
        More by {{ matchingQuote.reference?.authorName }}
      </div>
    </div>

    <MoreByPills :quotes=" quotesForAuthor" />

    <ColumnView class="gap-6" :count="quotesForAuthor.length">
      <div v-for="(quote, idx) in quotesForAuthor" :key="idx" class="inline-block mb-6">
        <StyledCard>
          <div class="p-4">
            <QuoteText :quote="quote" />
          </div>
        </StyledCard>
      </div>
    </ColumnView>
  </container>
</template>
