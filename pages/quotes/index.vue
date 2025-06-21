<script setup lang="ts">
import type { Quote } from '~/types'
import { UButton } from '#components'
import { getHighlightedQuote } from '~/shared/quotes'
import { slugify } from '~/shared/utils'

const NUM_CATEGORIES_TO_SHOW = 6
const NUM_AUTHORS_TO_SHOW = 8
const NUM_QUOTES_PER_SECTION = 8

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

const isSmallScreen = useIsSmallScreen()

const highlightedQuote = computed(() => {
  return getHighlightedQuote(quotes)
})

// Group quotes by author
const quotesByAuthor = computed(() => {
  const grouped = new Map<string, Quote[]>()

  quotes.value.forEach((quote) => {
    if (quote.reference?.authorName) {
      const authorName = quote.reference.authorName
      if (!grouped.has(authorName)) {
        grouped.set(authorName, [])
      }
      grouped.get(authorName)?.push(quote)
    }
  })

  // Sort by number of quotes and return top authors with their quotes
  return Array.from(grouped.entries())
    .map(([author, authorQuotes]) => ({
      author,
      quotes: authorQuotes.slice(0, NUM_QUOTES_PER_SECTION), // Show max 6 quotes per author
      authorSlug: authorQuotes[0]?.reference?.authorSlug,
    }))
    .sort((a, b) => b.quotes.length - a.quotes.length)
    .slice(0, NUM_AUTHORS_TO_SHOW) // Show top 8 authors
})

// Group quotes by category
const quotesByCategory = computed(() => {
  const grouped = new Map<string, Quote[]>()

  quotes.value.forEach((quote) => {
    if (quote.categories && quote.categories.length > 0) {
      quote.categories.forEach((category) => {
        if (!grouped.has(category)) {
          grouped.set(category, [])
        }
        grouped.get(category)?.push(quote)
      })
    }
  })

  // Sort by number of quotes and return top categories with their quotes
  return Array.from(grouped.entries())
    .map(([category, categoryQuotes]) => ({
      category,
      quotes: categoryQuotes.slice(0, NUM_QUOTES_PER_SECTION), // Show max 8 quotes per category
    }))
    .sort((a, b) => b.quotes.length - a.quotes.length)
    .slice(0, NUM_CATEGORIES_TO_SHOW) // Show top 6 categories
})

// Recent quotes (sorted by createdDate, most recent first)
const recentQuotes = computed(() => {
  return quotes.value
    .filter(quote => quote.createdDate) // Only include quotes with timestamps
    .sort((a, b) => {
      const dateA = new Date(a.createdDate!).getTime()
      const dateB = new Date(b.createdDate!).getTime()
      return dateB - dateA // Most recent first
    })
    .slice(0, NUM_QUOTES_PER_SECTION)
})

// Modal state for quote popup
const isQuoteModalOpen = ref(false)
const selectedQuote = ref<Quote | null>(null)

const selectedQuoteTitle = computed(() => {
  if (!selectedQuote.value)
    return ''

  const reference = selectedQuote.value.reference

  if (reference?.authorName && reference?.referenceName)
    return `${reference.authorName} — ${reference.referenceName}`

  return reference?.authorName || reference?.referenceName || ''
})

function openQuoteModal(quote: Quote) {
  selectedQuote.value = quote
  isQuoteModalOpen.value = true
}

function closeQuoteModal() {
  isQuoteModalOpen.value = false
  selectedQuote.value = null
}

useSeoMeta({
  title: 'The Good Land — Quotes',
})
</script>

<template>
  <Container>
    <PageHeader heading="All Quotes" />

    <!-- Quote of the Day Section -->
    <StyledCard class="mt-10 mb-12" highlighted-state="active">
      <div class="p-4 md:p-8">
        <h2 class="text-xl mb-7 text-center font-semibold">
          Quote of the Day
        </h2>
        <ClientOnly>
          <QuoteTextWithCategories :quote="highlightedQuote" />
        </ClientOnly>
      </div>
    </StyledCard>

    <!-- Quick Explorer -->
    <QuoteDropdownExplorer class="mb-12" />

    <!-- Recent Quotes Section -->
    <QuoteSection title="Recently Added" :quotes="recentQuotes" @quote-click="openQuoteModal" />

    <!-- Quotes by Author Sections -->
    <QuoteSection
      v-for="authorGroup in quotesByAuthor" :key="authorGroup.author" :title="authorGroup.author"
      :quotes="authorGroup.quotes"
      :view-all-link="authorGroup.authorSlug ? `/quotes/author/${authorGroup.authorSlug}` : undefined"
      @quote-click="openQuoteModal"
    />

    <!-- Quotes by Category Sections -->
    <QuoteSection
      v-for="categoryGroup in quotesByCategory" :key="categoryGroup.category"
      :title="categoryGroup.category" :quotes="categoryGroup.quotes"
      :view-all-link="`/quotes/category/${slugify(categoryGroup.category)}`" @quote-click="openQuoteModal"
    />

    <!-- View All Link -->
    <div class="text-center my-16">
      <UButton to="/quotes/browse" variant="outline" size="lg" color="neutral">
        Browse All Quotes
      </UButton>
    </div>

    <!-- Quote Modal -->
    <UModal
      v-model:open="isQuoteModalOpen" class="max-w-3xl" :title="selectedQuoteTitle" :ui="{
        overlay: 'backdrop-blur-xs',
      }" :fullscreen="isSmallScreen" overlay
    >
      <template #header>
        <div class="flex justify-between items-center w-full">
          <div class="text-toned">
            {{ selectedQuoteTitle }}
          </div>
          <UButton variant="ghost" size="sm" color="neutral" @click="closeQuoteModal">
            <Icon name="i-lucide-x" class="text-2xl" />
          </UButton>
        </div>
      </template>
      <template #body>
        <QuoteTextWithCategories v-if="selectedQuote" :quote="selectedQuote" @close="closeQuoteModal" />
      </template>
    </UModal>
  </Container>
</template>
