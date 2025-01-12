<script setup lang="ts">
import type { BreadCrumb, Quote } from '~/types'

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

const { params: { id } } = useRoute()

const quotesForAuthor = computed(() => {
  return quotes.value.filter((quote) => {
    return quote.reference?.authorSlug === id
  })
})

const author = computed(() => quotesForAuthor.value[0]?.reference?.authorName)

const breadCrumbs = computed(() => {
  return [
    { text: 'Quotes', link: '/quotes' },
    { text: author.value },
  ] as BreadCrumb[]
})

useSeoMeta({
  title: `${author.value} Quotes`,
  description: `Quotes by ${author.value}`,
  ogDescription: `Quotes by ${author.value}`,
})
</script>

<template>
  <Container>
    <QuoteHeader :heading="(author as string)" :bread-crumbs="breadCrumbs" />

    <MoreByPills :quotes="quotesForAuthor" />

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
