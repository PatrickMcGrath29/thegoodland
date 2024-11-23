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

const references = computed(() => {
  const referenceIds: string[] = []
  const references = []

  for (const quote of quotesForAuthor.value) {
    if (quote.reference && !referenceIds.includes(quote.reference?.uuid) && quote.reference.referenceName) {
      referenceIds.push(quote.reference?.uuid)
      references.push(quote.reference)
    }
  }

  return references
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

    <div v-if="references.length > 1" class="flex overflow-auto gap-3 pb-3 mb-3">
      <StyledCard v-for="(reference, idx) in references" :key="idx" :scale="false">
        <NuxtLink
          :to="`/quotes/reference/${reference.referenceSlug}`"
          class="whitespace-nowrap max-w-60 flex px-3 py-2"
        >
          <span class="text-ellipsis overflow-hidden text-sm">
            {{ reference.referenceName }}
          </span>
        </NuxtLink>
      </StyledCard>
    </div>

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
