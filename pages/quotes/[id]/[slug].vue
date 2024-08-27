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
</script>

<template>
  <Container>
    <StyledCard :disable-hover="true" class="my-10">
      <div class="p-6">
        <LargeQuote :quote="matchingQuote" />
      </div>
    </StyledCard>
  </container>
</template>
