<script setup lang="ts">
import type { BreadCrumb, Quote } from '~/types'

const { params: { id } } = useRoute()
const { data: quotes } = await useAsyncData('fetchQuotes', () => useQuotes())

const quotesForReference = computed(() => {
  if (!quotes.value)
    throw createError({ statusCode: 404, statusMessage: 'Quotes Not Found.' })

  const foundQuotes = quotes.value.filter((quote) => {
    return quote.reference?.referenceSlug === id
  })

  if (foundQuotes.length === 0)
    throw createError({ statusCode: 404, statusMessage: 'Reference Not Found.' })

  return foundQuotes
}) as ComputedRef<[Quote, ...Quote[]]>

const reference = computed(() => quotesForReference.value[0].reference)
const heading = computed(() => {
  return `${reference.value?.referenceName} Quotes`
})
const subheading = computed(() => {
  if (!reference.value?.authorName)
    return undefined

  return `by ${reference.value?.authorName}`
})

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
    <PageHeader :heading="heading" :subheading="subheading" :bread-crumbs="breadCrumbs" />

    <QuoteDropdownExplorer class="mb-8" />

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
