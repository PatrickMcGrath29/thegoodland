<script setup lang="ts">
const quoteStore = useQuoteStore()
await useAsyncData(() => {
  return quoteStore.fetchQuotes()
})
</script>

<template>
  <Container>
    <h1 class="text-4xl text-center my-10 font-bold">
      Quotes
    </h1>
    <ColumnView class="gap-6" :count="quoteStore.quotes.length">
      <div v-for="(quote, idx) in quoteStore.quotes" :key="idx" class="inline-block mb-6">
        <StyledCard>
          <div class="p-6">
            <QuoteText :quote="quote" />
          </div>
        </StyledCard>
      </div>
    </ColumnView>
  </Container>
</template>
