<script setup lang="ts">
const quotes = await useQuotes()

useSeoMeta({
  title: 'Browse All Quotes — The Good Land',
  description: 'Browse all quotes in our collection.',
})
</script>

<template>
  <Container>
    <PageHeader heading="Browse All Quotes" subtitle="Quotes" />

    <ColumnView class="gap-6" :count="quotes.length">
      <div v-for="(quote, idx) in quotes" :key="idx" class="inline-block mb-6">
        <StyledCard>
          <div class="p-3 sm:p-4">
            <QuoteText :quote="quote" />
          </div>
        </StyledCard>
      </div>
    </ColumnView>
  </Container>
</template>
