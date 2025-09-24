<script setup lang="ts">
import type { CommandPaletteItem } from '@nuxt/ui'
import type { Quote } from '~/types'

const searchTerm = ref('')
const route = useRoute()

const settingsStore = useSettingsStore()
const isSmallScreen = useIsSmallScreen()

const posts = await useAllPosts()
const quotes = await useQuotes()

const { Command_K, Ctrl_K } = useMagicKeys()

watch(route, () => {
  settingsStore.searchOpen = false
})

onMounted(() => {
  watch([Command_K, Ctrl_K], (v) => {
    if (settingsStore.searchOpen)
      return

    if (v)
      settingsStore.searchOpen = true
  })
})

const matchingQuotes = computed(() => {
  const quoteSuffix = (quote: Quote) => {
    return quote.reference?.referenceName
      ? `${quote.reference?.referenceName} by ${quote.reference?.authorName}`
      : `by ${quote.reference?.authorName}`
  }

  return quotes?.map(quote => ({
    label: quote.text,
    suffix: quoteSuffix(quote),
    onSelect: () => {
      navigateTo(`/quotes/${quote.uuid}/${quote.slug}`)
    },
  }))
})

const matchingPosts = computed(() => {
  return posts?.map(post => ({
    label: post.title,
    suffix: post.author ? `by ${post.author}` : undefined,
    onSelect: () => {
      navigateTo(`/posts/${post.slug}`)
    },
  }))
})

const groups = ref([
  {
    id: 'posts',
    label: 'Blog Posts',
    items: matchingPosts.value as CommandPaletteItem[],
  },
  {
    id: 'quotes',
    label: 'Quotes',
    items: matchingQuotes.value as CommandPaletteItem[],
  },
])
</script>

<template>
  <UModal
    v-model:open="settingsStore.searchOpen" class="max-w-4xl" :class="{ 'h-130': !isSmallScreen }"
    :fullscreen="isSmallScreen"
  >
    <template #content>
      <UCommandPalette
        v-model:search-term="searchTerm" :groups="groups" placeholder="Search..." :close="{
          onClick: () => {
            settingsStore.searchOpen = false
          },
        }" :fuse="{ fuseOptions: { includeMatches: true }, resultLimit: 40 }" :ui="{
          item: 'cursor-pointer',
          label: 'font-bold text-md pb-4',
          close: 'text-lg',
        }"
      >
        <template #item="{ item }">
          <GlobalSearchEntry :item="item" :search-term="searchTerm" />
        </template>
      </UCommandPalette>
    </template>
  </UModal>
</template>
