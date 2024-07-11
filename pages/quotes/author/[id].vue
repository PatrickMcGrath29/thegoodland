<script setup lang="ts">
const quoteStore = useQuoteStore()

await useAsyncData('fetch-quotes', () => {
  return quoteStore.fetchQuotes()
})

const { params: { id } } = useRoute()

const quotesForAuthor = computed(() => {
  return quoteStore.quotes.filter((quote) => {
    const authorName = quote.reference?.authorName
    return authorName && slugify(authorName) === id
  })
})

const author = computed(() => quotesForAuthor.value[0]?.reference?.authorName)

const columnSettings = computed(() => {
  return useColumnSettings(quotesForAuthor.value.length)
})
</script>

<template>
  <Container>
    <h1 class="text-4xl text-center my-10 font-bold">
      {{ author }} Quotes
    </h1>
    <div class="gap-6" :class="columnSettings">
      <div v-for="(quote, idx) in quotesForAuthor" :key="idx" class="inline-block mb-6">
        <StyledCard>
          <div class="p-6">
            <QuoteText :quote="quote" />
          </div>
        </StyledCard>
      </div>
    </div>
  </Container>
</template>
