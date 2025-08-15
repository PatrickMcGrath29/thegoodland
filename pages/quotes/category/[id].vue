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
  return quotesForCategory.value[0].categories?.find(c => slugify(c) === id) as string
})

useSeoMeta({
  title: `Quotes About ${category.value}`,
  description: `Quotes About ${category.value}`,
  ogDescription: `Quotes About ${category.value}`,
})
</script>

<template>
  <Container>
    <PageHeader :heading="category" subtitle="Quotes" />

    <ColumnView class="gap-6" :count="quotesForCategory.length">
      <div v-for="(quote, idx) in quotesForCategory" :key="idx" class="inline-block mb-6">
        <StyledCard>
          <div class="p-3 sm:p-4">
            <QuoteText :quote="quote" />
          </div>
        </StyledCard>
      </div>
    </ColumnView>
  </Container>
</template>
