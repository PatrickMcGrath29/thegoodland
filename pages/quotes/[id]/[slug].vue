<script setup lang="ts">
import type { BreadCrumb, Quote } from '~/types'

const { params: { id } } = useRoute()

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

const matchingQuote = computed(() => {
  return quotes.value.find((quote) => {
    return quote.uuid === id
  })
}) as Ref<Quote>

const quotesForAuthor = computed(() => {
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

  if (matchingQuote.value.reference?.referenceName) {
    const referenceCrumb = {
      text: matchingQuote.value.reference?.referenceName,
      link: undefined,
    }
    crumbs.push(referenceCrumb)
  }

  return crumbs
})

const heading = computed(() => {
  return matchingQuote.value.reference?.referenceName || matchingQuote.value.reference?.authorName
})
</script>

<template>
  <Container>
    <QuoteHeader :heading="(heading as string)" :bread-crumbs="breadCrumbs" />

    <StyledCard highlighted-state="active" class="my-10">
      <div class="p-6">
        <QuoteText :quote="matchingQuote" :show-perma-link="false" />
      </div>
    </StyledCard>

    <div v-if="quotesForAuthor.length > 1" class="my-14">
      <div class="divider text-lg font-semibold text-center">
        More by {{ matchingQuote.reference?.authorName }}
      </div>
    </div>

    <ColumnView class="gap-6" :count="quotesForAuthor.length">
      <div v-for="(quote, idx) in quotesForAuthor" :key="idx" class="inline-block mb-6">
        <StyledCard>
          <div class="p-4">
            <QuoteText :quote="quote" />
          </div>
        </StyledCard>
      </div>
    </ColumnView>
  </container>
</template>
