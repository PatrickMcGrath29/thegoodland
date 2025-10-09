<script setup lang="ts">
import type { Options, SearchOptions, SearchResult } from 'minisearch'
import type { Post } from '~~/types'
import { toHast } from 'minimark/hast'
import MiniSearch from 'minisearch'
import { smartEllipsis } from '~~/shared/utils'

const searchTerm = ref('')

const settingsStore = useSettingsStore()
const isSmallScreen = useIsSmallScreen()

const posts = await useAllPosts()
const quotes = await useQuotes()

const { Command_K, Ctrl_K } = useMagicKeys()

const MINISEARCH_OPTIONS: Options = {
  fields: ['indexedTitle', 'title', 'content', 'author', 'categories'],
  storeFields: ['indexedTitle', 'title', 'content', 'author', 'type', 'url'],
  tokenize: (text: string) => text.toLowerCase().split(/[\s\-.,;!?]+/),
  processTerm: (term: string) => term.toLowerCase().trim(),
}

const SEARCH_SETTINGS: SearchOptions = {
  fuzzy: 0.2,
  prefix: true,
  boost: {
    indexedTitle: 3,
    author: 2,
    categories: 1.5,
  },
  combineWith: 'OR',
}

interface SearchInput {
  id: string
  indexedTitle: string | undefined
  title: string | undefined
  content: string
  author: string
}

const miniSearch = new MiniSearch(MINISEARCH_OPTIONS)

const recentPosts: SearchResult[] = posts
  .filter(post => post.isBlogPost)
  .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
  .slice(0, 10)
  .map(post => ({
    id: `post-${post.uuid}`,
    indexedTitle: post.title,
    author: post.author || '',
    terms: [],
    queryTerms: [],
    score: 0,
    match: {},
    url: `/posts/${post.slug}`,
  }))

const quotesForMiniSearch: SearchInput[] = quotes.map(quote => ({
  id: `quote-${quote.uuid}`,
  indexedTitle: undefined,
  title: smartEllipsis(quote.text, 150),
  content: quote.text,
  author: quote.reference?.authorName || '',
  categories: quote.categories?.join(' ') || '',
  type: 'quote',
  url: `/quotes/${quote.uuid}/${quote.slug}`,
}))

const postsForMiniSearch: SearchInput[] = posts.map((post: Post) => ({
  id: `post-${post.uuid}`,
  indexedTitle: post.title,
  title: undefined,
  content: post.body ? extractTextFromAst(toHast(post.body)) : post.summary || '',
  author: post.author || '',
  categories: '',
  type: 'post',
  url: `/posts/${post.slug}`,
}))

// Add both posts and quotes to search index
miniSearch.addAll([...postsForMiniSearch, ...quotesForMiniSearch])

const searchResults = computed(() => {
  if (!searchTerm.value || searchTerm.value.trim().length < 2) {
    return recentPosts
  }

  const results = miniSearch.search(searchTerm.value, SEARCH_SETTINGS)

  return results.sort((a, b) => b.score - a.score).slice(0, 40)
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
    v-model:open="settingsStore.searchOpen" class="max-w-4xl" :fullscreen="isSmallScreen"
    :class="{ 'h-130': !isSmallScreen }"
  >
    <template #content>
      <div class="p-4">
        <UInput
          v-model:model-value="searchTerm" variant="soft" placeholder="Search quotes, posts, authors..."
          class="w-full" autofocus
        >
          <template #trailing>
            <UButton
              color="neutral" variant="link" icon="ph:x-bold" size="xl"
              @click="settingsStore.searchOpen = false"
            />
          </template>
        </UInput>
      </div>

      <div class="p-4 h-full overflow-y-scroll">
        <div v-if="searchResults.length > 0" class="">
          <div
            v-for="result in searchResults" :key="result.id"
            class="p-3 rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            @click="navigateToPage(result.url)"
          >
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1 min-w-0">
                <div class="font-medium text-sm line-clamp-2 flex items-center gap-1">
                  <span class="font-medium text-xs" :class="result.type === 'quote' ? 'text-accent' : 'text-blue-500'">
                    {{ result.type === 'quote' ? 'Quote' : 'Post' }}
                  </span>
                  <Icon name="ph:caret-right-bold" class="text-neutral-500" size="12.5px" />

                  {{ result.indexedTitle || result.title }}
                </div>
                <div v-if="result.author" class="text-xs text-neutral-500 mt-1">
                  by {{ result.author }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>
