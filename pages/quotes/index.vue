<script setup lang="ts">
import type { Quote } from '~/types'

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

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

const menu = ref()

async function navigateToAuthorPage(author: string) {
  await navigateTo(`/quotes/author/${authorSlug(author)}`)
}

function toggle(event) {
  menu.value.toggle(event)
}
</script>

<template>
  <Container>
    <QuoteHeader heading="All Quotes" />

    <div class="mb-6">
      <Button type="button" aria-haspopup="true" aria-controls="overlay_menu" pt:root="btn" @click="toggle">
        Authors
      </Button>

      <OverlayPanel ref="menu">
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
    </div>

    <ColumnView class="gap-6" :count="quotes.length">
      <div v-for="(quote, idx) in quotes" :key="idx" class="inline-block mb-6">
        <StyledCard>
          <div class="p-4">
            <QuoteText :quote="quote" />
          </div>
        </StyledCard>
      </div>
    </ColumnView>
  </Container>
</template>
