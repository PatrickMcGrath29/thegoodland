<script setup lang="ts">
import type { BreadCrumb, Quote } from '~/types'
import { smartEllipsis } from '~/shared/utils'

const { params: { id } } = useRoute()

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

const matchingQuote = computed(() => {
  return quotes.value.find((quote) => {
    return quote.uuid === id
  })
}) as Ref<Quote>

const additionalQuotesForAuthor = computed(() => {
  return quotes.value.filter((quote) => {
    return quote.reference?.authorSlug === matchingQuote.value.reference?.authorSlug
      && quote.uuid !== matchingQuote.value.uuid
  })
}) as Ref<Quote[]>

const breadCrumbs: Ref<BreadCrumb[]> = computed(() => {
  const crumbs = [
    { text: 'Quotes', link: '/quotes' },
  ] as BreadCrumb[]

  if (matchingQuote.value.reference?.authorName) {
    const authorCrumb = {
      text: matchingQuote.value.reference?.authorName,
      link: `/quotes/author/${matchingQuote.value.reference?.authorSlug}`,
    }
    crumbs.push(authorCrumb)
  }

  return crumbs
})

const heading = computed(() => {
  return matchingQuote.value.reference?.authorName || matchingQuote.value.reference?.referenceName
})

const title = computed(() => {
  return `${matchingQuote.value.reference?.authorName} Quotes — ${smartEllipsis(matchingQuote.value.text, 60)}`
})

useSeoMeta({
  title,
  ogTitle: title,
  description: matchingQuote.value.text,
  ogDescription: matchingQuote.value.text,
})
</script>

<template>
  <Container>
    <PageHeader :heading="(heading as string)" :bread-crumbs="breadCrumbs" subtitle="Quotes" />

    <StyledCard highlighted-state="active" class="my-10">
      <div class="p-6">
        <QuoteText :quote="matchingQuote" :show-perma-link="false" />
      </div>
    </StyledCard>

    <div v-if="additionalQuotesForAuthor.length > 0" class="my-14">
      <div class="text-lg font-semibold text-center">
        More by {{ matchingQuote.reference?.authorName }}
      </div>
    </div>

    <ColumnView v-if="additionalQuotesForAuthor.length > 0" class="gap-6" :count="additionalQuotesForAuthor.length">
      <div v-for="(quote, idx) in additionalQuotesForAuthor" :key="idx" class="inline-block mb-6">
        <StyledCard>
          <div class="p-4">
            <QuoteText :quote="quote" />
          </div>
        </StyledCard>
      </div>
    </ColumnView>
  </container>
</template>
