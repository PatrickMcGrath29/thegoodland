<script setup lang="ts">
import type { Quote, Reference } from '~/types'

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

const searchBarValue: Ref<string> = ref('')
const throttledSearchBarValue = refThrottled(searchBarValue, 250)

const matchingQuotes = computed(() => {
  if (throttledSearchBarValue.value === '')
    return quotes.value

  return quotes.value.filter((quote) => {
    const search = throttledSearchBarValue.value.toLowerCase()
    return quote.text.toLowerCase().includes(search)
  })
})

const authors = computed(() => {
  const authors = new Set(
    quotes.value.map(
      quote => quote.reference?.authorName,
    ).filter(
      author => author !== undefined,
    ).sort(),
  )
  return Array.from(authors)
})

const references: Ref<Reference[]> = computed(() => {
  const references = new Set(
    quotes.value.map(
      quote => quote.reference,
    ).filter(
      reference => reference !== undefined,
    ).filter(
      reference => reference.referenceName,
    ).sort(),
  )
  return Array.from(references)
})

async function navigateToAuthorPage(author: string) {
  await navigateTo(`/quotes/author/${authorSlug(author)}`)
}

async function navigateToReferencePage(reference: Reference) {
  const slug = referenceSlug(reference.authorName, reference.referenceName)
  await navigateTo(`/quotes/reference/${slug}`)
}
</script>

<template>
  <Container>
    <QuoteHeader heading="All Quotes" />

    <div class="mb-4 flex flex-wrap gap-3">
      <ContentOverlayPanel button-text="Authors" :nav-function="navigateToAuthorPage" :content-records="authors" />

      <ContentOverlayPanel
        button-text="Literature" :nav-function="navigateToReferencePage"
        :content-records="references" :record-display-selector="(record: Reference) => (record.referenceName as string)"
      />

      <div class="w-full sm:max-w-96">
        <label class="input input-bordered flex items-center gap-2">
          <Icon name="ph:magnifying-glass-duotone" />
          <input v-model="searchBarValue" placeholder="Search...">
        </label>
      </div>
    </div>

    <ColumnView class="gap-6" :count="matchingQuotes.length">
      <div v-for="(quote, idx) in matchingQuotes" :key="idx" class="inline-block mb-6">
        <StyledCard>
          <div class="p-4">
            <QuoteText :quote="quote" />
          </div>
        </StyledCard>
      </div>
    </ColumnView>
  </Container>
</template>
