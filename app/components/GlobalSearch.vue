<script setup lang="ts">
import type { FuseResult } from 'fuse.js'
import type { Post } from '~~/types'
import { refDebounced } from '@vueuse/core'
import { useFuse } from '@vueuse/integrations/useFuse'
import { toHast } from 'minimark/hast'
import { highlight } from '~~/shared/utils'

interface SearchFields {
  id: string
  truncateTitle: boolean
  indexedTitle: string | undefined
  title: string | undefined
  author: string
  content: string
  categories: string
  type: string
  url: string
}

export interface SearchDocument extends SearchFields {}

const searchTerm = ref('')
const debouncedSearchTerm = refDebounced(searchTerm, 75)

const settingsStore = useSettingsStore()
const isSmallScreen = useIsSmallScreen()

const posts = await useAllPosts()
const quotes = await useQuotes()

const activeIdx = ref(0)

const { Command_K, Ctrl_K } = useMagicKeys()

const quotesForSearch: SearchFields[] = quotes.map(quote => ({
  id: `quote-${quote.uuid}`,
  truncateTitle: true,
  indexedTitle: undefined,
  title: quote.text,
  content: quote.text,
  author: quote.reference?.authorName || '',
  categories: quote.categories?.join(' ') || '',
  type: 'quote',
  url: `/quotes/${quote.uuid}/${quote.slug}`,
}))

const postsForSearch: SearchFields[] = posts.map((post: Post) => ({
  id: `post-${post.uuid}`,
  truncateTitle: false,
  indexedTitle: post.title,
  title: undefined,
  content: post.body ? extractTextFromAst(toHast(post.body)) : post.summary || '',
  author: post.author || '',
  categories: '',
  type: 'post',
  url: `/posts/${post.slug}`,
}))

const allSearchDocuments = [...postsForSearch, ...quotesForSearch]

const { results: searchResults } = useFuse(debouncedSearchTerm, allSearchDocuments, {
  matchAllWhenSearchEmpty: true,
  resultLimit: 40,
  fuseOptions: {
    keys: [
      { name: 'indexedTitle', weight: 3 },
      { name: 'title', weight: 2.5 },
      { name: 'author', weight: 2 },
      { name: 'categories', weight: 1.5 },
      { name: 'content', weight: 1 },
    ],
    threshold: 0.3,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
    shouldSort: true,
    findAllMatches: false,
    ignoreLocation: true,
  },
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
  const selectedItem = searchResults.value[activeIdx.value]?.item

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

// Helper function to get highlighted title
function getHighlightedTitle(result: FuseResult<SearchDocument>) {
  // Try to get highlighted text for title or indexedTitle
  const titleField = result.item.indexedTitle ? 'indexedTitle' : 'title'
  const highlighted = highlight({
    item: { ...result.item, matches: result.matches },
    searchTerm: searchTerm.value,
    forceKey: titleField,
    truncate: result.item.truncateTitle,
  })

  // If we have a highlight, return it, otherwise return the plain text
  if (highlighted && searchTerm.value.trim()) {
    return highlighted
  }
  return result.item.indexedTitle || result.item.title || ''
}

// Helper function to get highlighted author
function getHighlightedAuthor(result: FuseResult<SearchDocument>) {
  const highlighted = highlight({
    item: { ...result.item, matches: result.matches },
    searchTerm: searchTerm.value,
    forceKey: 'author',
    truncate: false,
  })

  if (highlighted && searchTerm.value.trim()) {
    return highlighted
  }
  return result.item.author || ''
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
            v-for="(result, idx) in searchResults" :key="result.item.id"
            class="p-3 rounded-md cursor-pointer transition-colors" :class="{ 'bg-neutral-800': idx === activeIdx }"
            @click="navigateToPage(result.item.url)" @mousemove="activeIdx = idx"
          >
            <div class="flex items-start justify-between gap-2 [&_mark]:bg-accent">
              <div class="flex-1 min-w-0">
                <div class="font-medium text-sm flex items-center gap-1 w-full">
                  <span
                    class="font-medium text-xs"
                    :class="result.item.type === 'quote' ? 'text-accent' : 'text-blue-500'"
                  >
                    {{ result.item.type === 'quote' ? 'Quote' : 'Post' }}
                  </span>

                  <span>
                    <Icon name="ph:caret-right-bold" class="text-neutral-500" size="12.5px" />
                  </span>

                  <span class="line-clamp-1 overflow-ellipsis" v-html="getHighlightedTitle(result)" />
                </div>
                <div v-if="result.item.author" class="text-xs text-neutral-500 mt-1">
                  by <span v-html="getHighlightedAuthor(result)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>
