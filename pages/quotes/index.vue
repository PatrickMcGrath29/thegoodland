<script setup lang="ts">
import type { Quote, Reference } from '~/types'

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

const searchBarValue: Ref<string> = ref('')

const matchingQuotes = computed(() => {
  if (searchBarValue.value === '')
    return quotes.value

  return quotes.value.filter((quote) => {
    const search = searchBarValue.value.toLowerCase()
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

const authorDialog = ref()
const referenceDialog = ref()

async function navigateToAuthorPage(author: string) {
  await navigateTo(`/quotes/author/${authorSlug(author)}`)
}

async function navigateToReferencePage(reference: Reference) {
  const slug = referenceSlug(reference.authorName, reference.referenceName)
  console.log(slug)
  await navigateTo(`/quotes/reference/${slug}`)
}

function toggleAuthorDialog(event: any) {
  authorDialog.value.toggle(event)
}

function toggleReferenceDialog(event: any) {
  referenceDialog.value.toggle(event)
}
</script>

<template>
  <Container>
    <QuoteHeader heading="All Quotes" />

    <div class="mb-4 flex flex-wrap gap-3">
      <div class="grow sm:grow-0">
        <Button
          type="button" aria-haspopup="true" aria-controls="overlay_menu" pt:root="btn w-full"
          @click="toggleAuthorDialog"
        >
          Authors
        </Button>
      </div>

      <OverlayPanel ref="authorDialog">
        <div
          class="border my-1 p-4 rounded-md border-base-100 bg-base-300 shadow-md grid md:grid-cols-3 gap-1 max-h-96 overflow-scroll"
        >
          <div
            v-for="(author, idx) in authors" :key="idx" class="cursor-pointer hover:bg-neutral-700 p-1.5 rounded"
            @click="() => navigateToAuthorPage(author)"
          >
            {{ author }}
          </div>
        </div>
      </OverlayPanel>

      <div class="grow sm:grow-0">
        <Button
          type="button" aria-haspopup="true" aria-controls="overlay_menu" pt:root="btn w-full"
          @click="toggleReferenceDialog"
        >
          Literature
        </Button>
      </div>

      <OverlayPanel ref="referenceDialog">
        <div
          class="border my-1 p-4 rounded-md border-base-100 bg-base-300 shadow-md grid md:grid-cols-2 gap-1 max-h-96 overflow-scroll"
        >
          <div
            v-for="(reference, idx) in references" :key="idx"
            class="cursor-pointer hover:bg-neutral-700 p-1.5 rounded" @click="() => navigateToReferencePage(reference)"
          >
            {{ reference.referenceName }}
          </div>
        </div>
      </OverlayPanel>

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
