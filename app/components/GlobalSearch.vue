<script setup lang="ts">
import type { Options, SearchOptions, SearchResult } from 'minisearch'
import type { Post } from '~~/types'
import { toHast } from 'minimark/hast'
import MiniSearch from 'minisearch'
import { smartEllipsis } from '~~/shared/utils'

interface SearchFields {
  indexedTitle: string | undefined
  title: string | undefined
  author: string
  content: string
  categories: string
  type: string
  url: string
}

const INDEX_FIELDS: (keyof SearchFields)[] = [
  'indexedTitle',
  'title',
  'content',
  'author',
  'categories',
]

const STORE_FIELDS: (keyof SearchFields)[] = [
  'indexedTitle',
  'title',
  'categories',
  'author',
  'type',
  'url',
]

export interface SearchDocument extends SearchResult, SearchFields {}

const searchTerm = ref('')

const settingsStore = useSettingsStore()
const isSmallScreen = useIsSmallScreen()

const posts = await useAllPosts()
const quotes = await useQuotes()

const activeIdx = ref(0)

const { Command_K, Ctrl_K } = useMagicKeys()

const MINISEARCH_OPTIONS: Options = {
  fields: INDEX_FIELDS,
  storeFields: STORE_FIELDS,
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

const miniSearch = new MiniSearch(MINISEARCH_OPTIONS)

const recentPosts: SearchDocument[] = posts
  .filter(post => post.isBlogPost)
  .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
  .slice(0, 10)
  .map(post => ({
    id: `post-${post.uuid}`,
    indexedTitle: post.title,
    title: undefined,
    author: post.author || '',
    content: '',
    categories: '',
    type: 'post',
    url: `/posts/${post.slug}`,
    score: 0,
    terms: [],
    queryTerms: [],
    match: {},
  }))

const quotesForMiniSearch: SearchFields[] = quotes.map(quote => ({
  id: `post-${quote.uuid}`,
  indexedTitle: undefined,
  title: smartEllipsis(quote.text, 100),
  content: quote.text,
  author: quote.reference?.authorName || '',
  categories: quote.categories?.join(' ') || '',
  type: 'quote',
  url: `/quotes/${quote.uuid}/${quote.slug}`,
}))

const postsForMiniSearch: SearchFields[] = posts.map((post: Post) => ({
  id: `post-${post.uuid}`,
  indexedTitle: post.title,
  title: undefined,
  content: post.body ? extractTextFromAst(toHast(post.body)) : post.summary || '',
  author: post.author || '',
  categories: '',
  type: 'post',
  url: `/posts/${post.slug}`,
}))

miniSearch.addAll([...postsForMiniSearch, ...quotesForMiniSearch])

const searchResults = computed(() => {
  if (!searchTerm.value || searchTerm.value.trim().length < 2) {
    return recentPosts
  }

  const results = miniSearch.search(searchTerm.value, SEARCH_SETTINGS) as SearchDocument[]
  return results.sort((a, b) => b.score - a.score).slice(0, 40)
})

watch(searchTerm, () => {
  activeIdx.value = 0
})

onKeyStroke('ArrowDown', () => {
  if (activeIdx.value === searchResults.value.length - 1)
    return

  activeIdx.value += 1
})

onKeyStroke('ArrowUp', () => {
  if (activeIdx.value === 0)
    return

  activeIdx.value -= 1
})

onKeyStroke('Enter', () => {
  const selectedItem = searchResults.value[activeIdx.value]

  if (selectedItem === undefined)
    return

  navigateToPage(selectedItem.url)
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
            v-for="(result, idx) in searchResults" :key="result.id"
            class="p-3 rounded-md cursor-pointer transition-colors" :class="{ 'bg-neutral-800': idx === activeIdx }"
            @click="navigateToPage(result.url)" @mousemove="activeIdx = idx"
          >
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1 min-w-0">
                <div class="font-medium text-sm flex items-center gap-1">
                  <span class="font-medium text-xs" :class="result.type === 'quote' ? 'text-accent' : 'text-blue-500'">
                    {{ result.type === 'quote' ? 'Quote' : 'Post' }}
                  </span>
                  <Icon name="ph:caret-right-bold" class="text-neutral-500" size="12.5px" />

                  <span class="line-clamp-1 overflow-ellipsis">
                    {{ result.indexedTitle || result.title }}

                  </span>
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
