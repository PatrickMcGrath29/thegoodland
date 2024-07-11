<script setup lang="ts">
const quoteStore = useQuoteStore()

await useAsyncData('fetch-quotes', () => {
  return quoteStore.fetchQuotes()
})

const { params: { id } } = useRoute()

const quotesForReference = computed(() => {
  return quoteStore.quotes.filter((quote) => {
    const referenceName = quote.reference?.referenceName
    return referenceName && slugify(referenceName) === id
  })
})

const reference = computed(() => quotesForReference.value[0]?.reference?.referenceName)

const columnSettings = computed(() => {
  return useColumnSettings(quotesForReference.value.length)
})
</script>

<template>
  <Container>
    <h1 class="text-4xl text-center my-10 font-bold">
      {{ reference }} Quotes
    </h1>
    <div class="gap-6" :class="columnSettings">
      <div v-for="(quote, idx) in quotesForReference" :key="idx" class="inline-block mb-6">
        <StyledCard>
          <div class="p-6">
            <QuoteText :quote="quote" />
          </div>
        </StyledCard>
      </div>
    </div>
  </Container>
</template>
