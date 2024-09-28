<script setup lang="ts">
import type { Quote } from '~/types'

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

const { params: { id } } = useRoute()

const quotesForReference = computed(() => {
  return quotes.value.filter((quote) => {
    return quote.reference?.referenceSlug === id
  })
})

const reference = computed(() => quotesForReference.value[0]?.reference)
const title = computed(() => `${reference.value?.referenceName} Quotes by ${reference.value?.authorName}`)

useSeoMeta({
  title,
  description: title,
  ogDescription: title,
})
</script>

<template>
  <Container>
    <div class="my-8 text-neutral-400 font-medium text-sm text-center md:text-left">
      <NuxtLink to="/quotes" class="hover:text-accent hover:text-opacity-70">
        Quotes
      </NuxtLink>
      <span class="mx-2 text-neutral-700">/</span>
      <NuxtLink :to="`/quotes/author/${reference?.authorSlug}`" class="hover:text-accent hover:text-opacity-70">
        {{ reference?.authorName }}
      </NuxtLink>
      <span class="mx-2 text-neutral-700">/</span>
      <span class="text-neutral-500">
        {{ reference?.referenceName }}
      </span>
    </div>

    <QuoteHeader :heading="reference?.referenceName" with-bread-crumbs />

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
