<script setup lang="ts">
import type { BreadCrumb, Quote } from '~/types'
import { slugify } from '~/shared/utils'

const { params: { id } } = useRoute()
const { data: quotes } = await useAsyncData('fetchQuotes', () => useQuotes())

const quotesForCategory = computed(() => {
  if (!quotes.value)
    throw createError({ statusCode: 404, statusMessage: 'Quotes not found.' })

  const foundQuotes = quotes.value.filter((quote) => {
    return quote.categories?.map(q => slugify(q)).includes(id as string)
  })

  if (foundQuotes.length === 0)
    throw createError({ statusCode: 404, statusMessage: `Category not found. ${id}` })

  return foundQuotes
}) as ComputedRef<[Quote, ...Quote[]]>

const category = computed(() => {
  return quotesForCategory.value[0].categories?.find(c => slugify(c) === id)
})
const heading = computed(() => {
  return `Quotes About ${category.value}`
})

const breadCrumbs = computed(() => {
  return [
    { text: 'Quotes', link: '/quotes' },
    { text: category.value },
  ] as BreadCrumb[]
})

useSeoMeta({
  title: heading,
  description: heading,
  ogDescription: heading,
})
</script>

<template>
  <Container>
    <PageHeader :heading="heading" :bread-crumbs="breadCrumbs" />

    <QuoteDropdownExplorer class="mb-8" />

    <ColumnView class="gap-6" :count="quotesForCategory.length">
      <div v-for="(quote, idx) in quotesForCategory" :key="idx" class="inline-block mb-6">
        <StyledCard>
          <div class="p-6">
            <QuoteText :quote="quote" />
          </div>
        </StyledCard>
      </div>
    </ColumnView>
  </Container>
</template>
