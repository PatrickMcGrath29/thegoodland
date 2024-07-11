<script setup lang="ts">
const quoteStore = useQuoteStore()

await useAsyncData('fetch-quotes', () => quoteStore.fetchQuotes())

const { params: { id } } = useRoute()

const quotesForReference = computed(() => {
  return quoteStore.quotes.filter((quote) => {
    const referenceName = quote.reference?.referenceName
    return referenceName && slugify(referenceName) === id
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
    <h1 class="text-4xl text-center my-10 font-bold">
      {{ reference }} Quotes
    </h1>
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
