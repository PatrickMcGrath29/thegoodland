<script setup lang="ts">
import type { CommandPaletteItem } from '@nuxt/ui'
import type { Quote } from '~/types'
import { smartEllipsis } from '~/shared/utils'

const searchTerm = ref('')

const { data: posts } = await useAsyncData('allPosts', () => useBlogPosts())
const { data: quotes } = await useAsyncData('fetchQuotes', () => useQuotes())

const matchingQuotes = computed(() => {
  const quoteSuffix = (quote: Quote) => {
    return quote.reference?.referenceName
      ? `${quote.reference?.referenceName} by ${quote.reference?.authorName}`
      : `by ${quote.reference?.authorName}`
  }

  return quotes.value?.filter(quote => quote.text.includes(searchTerm.value)).map(quote => ({
    label: smartEllipsis(quote.text, 50),
    suffix: quoteSuffix(quote),
    onSelect: () => {
      navigateTo(`/quotes/${quote.uuid}/${quote.slug}`)
    },
  }))
})

const matchingPosts = computed(() => {
  return posts.value?.filter(post => post.title.includes(searchTerm.value)).map(post => ({
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
    label: 'Posts',
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
  <UCommandPalette v-model:search-term="searchTerm" :groups="groups" placeholder="Search..."  />
</template>
