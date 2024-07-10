<script setup lang="ts">
const quoteStore = useQuoteStore()
await quoteStore.fetchQuotes()

const columnSettings = computed(() => {
  return useColumnSettings(quoteStore.quotesForCategory.length)
})
</script>

<template>
  <Container>
    <h1 class="text-4xl text-center my-10 font-bold">
      Quotes
    </h1>
    <div class="gap-6" :class="columnSettings">
      <div v-for="(quote, idx) in quoteStore.quotes" :key="idx" class="inline-block mb-6">
        <StyledCard>
          <div class="p-6">
            <QuoteText :quote="quote" />
          </div>
        </StyledCard>
      </div>
    </div>
  </Container>
</template>
