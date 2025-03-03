<script setup lang="ts">
import type { BreadCrumb, Quote } from '~/types'

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

const { params: { id } } = useRoute()

const quotesForReference = computed(() => {
  return quotes.value.filter((quote) => {
    return quote.reference?.referenceSlug === id
  })
})

const reference = computed(() => quotesForReference.value[0]?.reference)
const breadCrumbs: Ref<BreadCrumb[]> = computed(() => {
  return [
    { text: 'Quotes', link: '/quotes' },
    { text: reference.value?.authorName, link: `/quotes/author/${reference.value?.authorSlug}` },
    { text: reference.value?.referenceName },
  ] as BreadCrumb[]
})

const title = computed(() => `${reference.value?.referenceName} Quotes by ${reference.value?.authorName}`)

useSeoMeta({
  title,
  description: title,
  ogDescription: title,
})
</script>

<template>
  <Container>
    <PageHeader :heading="(reference?.referenceName as string)" :bread-crumbs="breadCrumbs" subtitle="Quotes" />

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
