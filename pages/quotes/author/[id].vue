<script setup lang="ts">
import type { BreadCrumb, Quote } from '~/types'

const { params: { id } } = useRoute()
const { data: quotes } = await useAsyncData('fetchQuotes', () => useQuotes())

const quotesForAuthor = computed(() => {
  if (!quotes.value)
    throw createError({ statusCode: 404, statusMessage: 'Quotes not found.' })

  const foundQuotes = quotes.value.filter((quote) => {
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
    <PageHeader :heading="heading" :bread-crumbs="breadCrumbs" />

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
