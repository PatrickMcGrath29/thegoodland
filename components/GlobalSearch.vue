<script setup lang="ts">
import type { CommandPaletteItem } from '@nuxt/ui'
import type { Quote } from '~/types'
import { smartEllipsis } from '~/shared/utils'

const searchTerm = ref('')
const route = useRoute()

const settingsStore = useSettingsStore()
const isSmallScreen = useIsSmallScreen()

const { data: posts } = await useAsyncData('allPosts', () => useBlogPosts())
const { data: quotes } = await useAsyncData('fetchQuotes', () => useQuotes())

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

  return quotes.value?.map(quote => ({
    label: quote.text,
    suffix: quoteSuffix(quote),
    onSelect: () => {
      navigateTo(`/quotes/${quote.uuid}/${quote.slug}`)
    },
  }))
})

const matchingPosts = computed(() => {
  return posts.value?.map(post => ({
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
  <UModal v-model:open="settingsStore.searchOpen" class="max-w-4xl" :class="{ 'h-130': !isSmallScreen }" :fullscreen="isSmallScreen">
    <template #content>
      <UCommandPalette
        v-model:search-term="searchTerm" :groups="groups" placeholder="Search..." :close="{
          onClick: () => {
            settingsStore.searchOpen = false
          },
        }" :ui="{
          item: 'cursor-pointer',
          label: 'font-bold text-md pb-4',
          close: 'text-lg',
        }"
      >
        <template #item="{ item }">
          <div class="text-left py-0.5 ">
            <div>
              <span>{{ smartEllipsis(item.label || '', 100) }}</span>
            </div>
            <div class="text-sm text-dimmed">
              {{ item.suffix }}
            </div>
          </div>
        </template>
      </UCommandPalette>
    </template>
  </UModal>
</template>
