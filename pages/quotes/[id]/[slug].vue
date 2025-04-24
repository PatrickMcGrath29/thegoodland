<script setup lang="ts">
import type { BreadCrumb, Quote } from '~/types'
import { smartEllipsis } from '~/shared/utils'

const { params: { id } } = useRoute()

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

const matchingQuote = computed(() => {
  const foundQuote = quotes.value.find((quote) => {
    return quote.uuid === id
  })

  if (!foundQuote)
    throw createError({ statusCode: 404, statusMessage: 'Quote Not Found.' })

  return foundQuote
})

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
  return `${matchingQuote.value.reference?.authorName} Quotes — ${matchingQuote.value.reference?.referenceName || smartEllipsis(matchingQuote.value.text, 40)}`
})

const description = computed(() => {
  return smartEllipsis(matchingQuote.value.text, 150)
})

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
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
      <div class="flex flex-col md:flex-row items-center justify-center">
        <div
          class="text-sm border-neutral-500 font-light text-neutral-500 border-b md:border-r md:border-b-0 pb-1 md:pr-3 md:pb-0"
        >
          Continue Reading
        </div>
        <span class="text-lg pt-1 md:pl-3 md:pt-0 font-medium text-center md:text-left">
          More by {{ matchingQuote.reference?.authorName }}
        </span>
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
