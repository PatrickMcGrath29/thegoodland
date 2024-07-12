<script setup lang="ts">
const quoteStore = useQuoteStore()

await useAsyncData('fetch-quotes', () => {
  return quoteStore.fetchQuotes()
})

const { params: { id } } = useRoute()

const quotesForAuthor = computed(() => {
  return quoteStore.quotes.filter((quote) => {
    return quote.reference?.authorSlug === id
  })
})

const author = computed(() => quotesForAuthor.value[0]?.reference?.authorName)

useSeoMeta({
  title: `${author.value} Quotes`,
  description: `Quotes by ${author.value}`,
  ogDescription: `Quotes by ${author.value}`,
})
</script>

<template>
  <Container>
    <h1 class="text-4xl text-center my-10 font-bold">
      {{ author }} Quotes
    </h1>
    <ColumnView class="gap-6" :count="quotesForAuthor.length">
      <div v-for="(quote, idx) in quotesForAuthor" :key="idx" class="inline-block mb-6">
        <StyledCard>
          <div class="p-6">
            <QuoteText :quote="quote" />
          </div>
        </StyledCard>
      </div>
    </ColumnView>
  </Container>
</template>
