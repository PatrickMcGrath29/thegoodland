<script setup lang="ts">
import { toHast } from 'minimark/hast'
import MiniSearch from 'minisearch'

const searchTerm = ref('')

const settingsStore = useSettingsStore()
const isSmallScreen = useIsSmallScreen()

const posts = await useAllPosts()
const quotes = await useQuotes()

const { Command_K, Ctrl_K } = useMagicKeys()

interface MiniSearchResult {
  id: string
  indexedTitle: string | undefined
  title: string | undefined
  content: string
  author: string
}

const miniSearch = new MiniSearch({
  fields: ['indexedTitle', 'title', 'content', 'author', 'categories'],
  storeFields: ['indexedTitle', 'title', 'content', 'author', 'type', 'url'],
  // Tokenization options for better text processing
  tokenize: (text: string) => text.toLowerCase().split(/[\s\-.,;!?]+/),
  // Process search terms the same way
  processTerm: (term: string) => term.toLowerCase().trim(),
})

const quotesForMiniSearch: MiniSearchResult[] = quotes.map(quote => ({
  id: `quote-${quote.uuid}`,
  indexedTitle: undefined,
  title: quote.text.slice(0, 100),
  content: quote.text,
  author: quote.reference?.authorName || '',
  categories: quote.categories?.join(' ') || '',
  type: 'quote',
  url: `/quotes/${quote.uuid}/${quote.slug}`,
}))

const postsForMiniSearch = posts.map((post: any) => ({
  id: `post-${post.uuid}`,
  indexedTitle: post.title,
  title: undefined,
  content: post.body ? extractTextFromAst(toHast(post.body)).slice(0, 5000) : post.summary || '',
  author: post.author || '',
  categories: '',
  type: 'post',
  url: `/posts/${post.slug}`,
}))

// Add both posts and quotes to search index
miniSearch.addAll([...postsForMiniSearch, ...quotesForMiniSearch])

const searchResults = computed(() => {
  if (!searchTerm.value || searchTerm.value.trim().length < 2) {
    return []
  }

  // Use advanced search options for better results
  const results = miniSearch.search(searchTerm.value, {
    fuzzy: 0.2, // Allow fuzzy matching for typos
    prefix: true, // Allow prefix matching for partial words
    boost: { // Apply field-specific boosts at search time
      indexedTitle: 3,
      author: 2,
      categories: 1.5,
    },
    combineWith: 'OR', // Match any field, not all fields
  })

  // Sort by score (best matches first) and limit to top 20 results
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
})

onMounted(() => {
  watch([Command_K, Ctrl_K], (v) => {
    if (settingsStore.searchOpen)
      return

    if (v)
      settingsStore.searchOpen = true
  })
})

function navigateToPage(url: string) {
  settingsStore.searchOpen = false
  navigateTo(url)
}
</script>

<template>
  <UModal
    v-model:open="settingsStore.searchOpen" class="max-w-4xl" :class="{ 'h-130': !isSmallScreen }"
    :fullscreen="isSmallScreen"
  >
    <template #content>
      <div class="p-4">
        <UInput
          v-model:model-value="searchTerm"
          placeholder="Search quotes, posts, authors..."
          class="mb-4"
          autofocus
        />

        <div v-if="searchResults.length > 0" class="space-y-2 max-h-96 overflow-y-auto">
          <div
            v-for="result in searchResults"
            :key="result.id"
            class="p-3 rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            @click="navigateToPage(result.url)"
          >
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1 min-w-0">
                <!-- Type badge -->
                <span
                  class="inline-block px-2 py-0.5 text-xs rounded-full mb-1"
                  :class="result.type === 'quote' ? 'bg-accent/10 text-accent' : 'bg-blue-500/10 text-blue-500'"
                >
                  {{ result.type === 'quote' ? 'Quote' : 'Post' }}
                </span>

                <!-- Title/Content -->
                <div class="font-medium text-sm line-clamp-2">
                  {{ result.indexedTitle || result.title }}
                </div>

                <!-- Author if available -->
                <div v-if="result.author" class="text-xs text-neutral-500 mt-1">
                  by {{ result.author }}
                </div>
              </div>

              <!-- Score indicator for debugging (remove in production) -->
              <div class="text-xs text-neutral-400">
                {{ (result.score * 100).toFixed(0) }}%
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="searchTerm.length >= 2" class="text-center py-8 text-neutral-500">
          No results found for "{{ searchTerm }}"
        </div>

        <div v-else class="text-center py-8 text-neutral-500">
          Type at least 2 characters to search
        </div>
      </div>
    </template>
  </UModal>
</template>
