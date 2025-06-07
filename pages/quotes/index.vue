<script setup lang="ts">
import type { Quote, Reference, TextLink } from '~/types'
import { getHighlightedQuote } from '~/shared/quotes'
import { authorSlug, referenceSlug, slugify, smartEllipsis } from '~/shared/utils'

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
        <div
          v-for="(quote, idx) in recentQuotes.slice(0, 10)"
          :key="idx"
          class="flex-none w-80 h-48"
        >
          <StyledCard class="h-full">
            <div class="p-4 h-full flex flex-col">
              <div class="flex-grow overflow-y-auto">
                <QuoteText :quote="quote" />
              </div>
            </div>
          </StyledCard>
        </div>
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
        <div
          v-for="(quote, idx) in authorGroup.quotes"
          :key="idx"
          class="flex-none w-80 h-48"
        >
          <StyledCard class="h-full">
            <div class="p-4 h-full flex flex-col">
              <div class="flex-grow overflow-y-auto">
                <QuoteText :quote="quote" />
              </div>
            </div>
          </StyledCard>
        </div>
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
        <div
          v-for="(quote, idx) in categoryGroup.quotes"
          :key="idx"
          class="flex-none w-80 h-48"
        >
          <StyledCard class="h-full">
            <div class="p-4 h-full flex flex-col">
              <div class="flex-grow overflow-y-auto">
                <QuoteText :quote="quote" />
              </div>
            </div>
          </StyledCard>
        </div>
      </div>
    </section>

    <!-- View All Link -->
    <div class="text-center mt-16">
      <NuxtLink to="/quotes/browse" class="btn btn-outline btn-lg">
        Browse All Quotes
      </NuxtLink>
    </div>
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

/* Style the quote text containers to have better scrolling */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 2px;
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.5);
}
</style>
