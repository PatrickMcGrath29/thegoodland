<script setup lang="ts">
import type { Quote, Reference, TextLink } from '~/types'
import { getHighlightedQuote } from '~/shared/quotes'
import { authorSlug, referenceSlug, slugify } from '~/shared/utils'

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

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
      quotes: authorQuotes.slice(0, 6), // Show max 6 quotes per author
      authorSlug: authorQuotes[0]?.reference?.authorSlug,
    }))
    .sort((a, b) => b.quotes.length - a.quotes.length)
    .slice(0, 8) // Show top 8 authors
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
      quotes: categoryQuotes.slice(0, 8), // Show max 8 quotes per category
    }))
    .sort((a, b) => b.quotes.length - a.quotes.length)
    .slice(0, 6) // Show top 6 categories
})

// Recent quotes (last 20 quotes, assuming they're ordered)
const recentQuotes = computed(() => {
  return quotes.value.slice(-20).reverse()
})

// Modal state for quote popup
const isQuoteModalOpen = ref(false)
const selectedQuote = ref<Quote | null>(null)

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
    <PageHeader heading="All Quotes" subtitle="Quotes" />

    <!-- Quote of the Day Section -->
    <StyledCard class="mt-10 mb-12" highlighted-state="active">
      <div class="p-4 md:p-8">
        <h2 class="text-xl mb-7 text-center font-semibold">
          Quote of the Day
        </h2>
        <ClientOnly>
          <QuoteText :quote="highlightedQuote" />
        </ClientOnly>
      </div>
    </StyledCard>

    <!-- Quick Explorer -->
    <QuoteDropdownExplorer class="mb-12" />

    <!-- Recent Quotes Section -->
    <section class="mb-12">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">
          Recently Added
        </h2>
        <NuxtLink to="/quotes/browse" class="text-accent hover:text-accent/80 text-sm font-medium">
          View All →
        </NuxtLink>
      </div>
      <div class="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
        <QuoteCard
          v-for="(quote, idx) in recentQuotes.slice(0, 10)"
          :key="idx"
          :quote="quote"
          @click="openQuoteModal"
        />
      </div>
    </section>

    <!-- Quotes by Author Sections -->
    <section v-for="authorGroup in quotesByAuthor" :key="authorGroup.author" class="mb-12">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">
          {{ authorGroup.author }}
        </h2>
        <NuxtLink
          v-if="authorGroup.authorSlug"
          :to="`/quotes/author/${authorGroup.authorSlug}`"
          class="text-accent hover:text-accent/80 text-sm font-medium"
        >
          View All →
        </NuxtLink>
      </div>
      <div class="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
        <QuoteCard
          v-for="(quote, idx) in authorGroup.quotes"
          :key="idx"
          :quote="quote"
          @click="openQuoteModal"
        />
      </div>
    </section>

    <!-- Quotes by Category Sections -->
    <section v-for="categoryGroup in quotesByCategory" :key="categoryGroup.category" class="mb-12">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">
          {{ categoryGroup.category }}
        </h2>
        <NuxtLink
          :to="`/quotes/category/${slugify(categoryGroup.category)}`"
          class="text-accent hover:text-accent/80 text-sm font-medium"
        >
          View All →
        </NuxtLink>
      </div>
      <div class="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
        <QuoteCard
          v-for="(quote, idx) in categoryGroup.quotes"
          :key="idx"
          :quote="quote"
          @click="openQuoteModal"
        />
      </div>
    </section>

    <!-- View All Link -->
    <div class="text-center mt-16">
      <NuxtLink to="/quotes/browse" class="btn btn-outline btn-lg">
        Browse All Quotes
      </NuxtLink>
    </div>

    <!-- Quote Modal -->
    <UModal
      v-model:open="isQuoteModalOpen"
      class="max-w-3xl"
      :ui="{
        overlay: 'bg-black/40 backdrop-blur-xs',
      }"
    >
      <template #content>
        <div
          v-if="selectedQuote"
          class="p-8 bg-neutral-800 border border-neutral-700 rounded-lg relative shadow-2xl"
        >
          <button
            class="absolute top-4 right-4 text-neutral-300 hover:text-white text-xl bg-neutral-800 hover:bg-neutral-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            @click="closeQuoteModal"
          >
            ✕
          </button>
          <div class="mb-6 pr-8">
            <QuoteText :quote="selectedQuote" />
          </div>
          <div class="flex justify-between items-center text-sm text-neutral-400">
            <div v-if="selectedQuote.categories && selectedQuote.categories.length > 0" class="flex gap-2">
              <span
                v-for="category in selectedQuote.categories"
                :key="category"
                class="px-2 py-1 bg-neutral-700 rounded text-xs"
              >
                {{ category }}
              </span>
            </div>
            <NuxtLink
              v-if="selectedQuote.uuid"
              :to="`/quotes/${selectedQuote.uuid}/${selectedQuote.slug}`"
              class="text-accent hover:text-accent/80 text-xs font-medium"
            >
              View Full Page →
            </NuxtLink>
          </div>
        </div>
      </template>
    </UModal>
  </Container>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
