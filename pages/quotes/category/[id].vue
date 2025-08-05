<script setup lang="ts">
import type { Quote } from '~/types'
import { slugify } from '~/shared/utils'

const { params: { id } } = useRoute()
const { data: quotes } = await useAsyncData('useQuotes', () => useQuotes())

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

useSeoMeta({
  title: heading,
  description: heading,
  ogDescription: heading,
})
</script>

<template>
  <Container>
    <PageHeader :heading="heading" subtitle="Quotes" />

    <QuoteDropdownExplorer class="flex justify-center sm:justify-start mb-4" />

    <ColumnView class="gap-6" :count="quotesForCategory.length">
      <div v-for="(quote, idx) in quotesForCategory" :key="idx" class="inline-block mb-6">
        <StyledCard>
          <div class="p-3 sm:p-4">
            <QuoteTextWithCategories :quote="quote" />
          </div>
        </StyledCard>
      </div>
    </ColumnView>
  </Container>
</template>
