<script setup lang="ts">
import type { Quote } from '~/types'

const { params: { id } } = useRoute()
const quotes = await useQuotes()

const quotesForAuthor = computed(() => {
  if (!quotes)
    throw createError({ statusCode: 404, statusMessage: 'Quotes not found.' })

  const foundQuotes = quotes.filter((quote) => {
    return quote.reference?.authorSlug === id
  })

  if (foundQuotes.length === 0)
    throw createError({ statusCode: 404, statusMessage: 'Author not found.' })

  return foundQuotes
}) as ComputedRef<[Quote, ...Quote[]]>

const author = computed(() => quotesForAuthor.value[0].reference?.authorName)
const heading = computed(() => {
  return `${author.value} Quotes`
})

useSeoMeta({
  title: `${author.value} Quotes`,
  description: `Quotes by ${author.value}`,
  ogDescription: `Quotes by ${author.value}`,
})
</script>

<template>
  <Container>
    <PageHeader :heading="heading" subtitle="Quotes" />

    <ColumnView class="gap-6" :count="quotesForAuthor.length">
      <div v-for="(quote, idx) in quotesForAuthor" :key="idx" class="inline-block mb-6">
        <StyledCard>
          <div class="p-3 sm:p-4">
            <QuoteText :quote="quote" />
          </div>
        </StyledCard>
      </div>
    </ColumnView>
  </Container>
</template>
