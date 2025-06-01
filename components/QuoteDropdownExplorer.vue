<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { Quote } from '~/types'
import { slugify } from '~/shared/utils'

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

const authors = computed(() => {
  const authorSlugs = [...new Set(quotes.value.map(quote => quote.reference?.authorSlug))]

  return authorSlugs.map(authorSlug => ({
    label: quotes.value.find(quote => quote.reference?.authorSlug === authorSlug)?.reference?.authorName ?? 'Unknown',
    to: `/quotes/author/${authorSlug}`,
  })).sort((a, b) => (a.label ?? '').localeCompare(b.label ?? ''))
})

const references = computed(() => {
  const referenceSlugs = [...new Set(quotes.value.filter(quote => quote.reference?.referenceSlug).map(quote => quote.reference?.referenceSlug))]

  return referenceSlugs.map(referenceSlug => ({
    label: quotes.value.find(quote => quote.reference?.referenceSlug === referenceSlug)?.reference?.referenceName,
    description: quotes.value.find(quote => quote.reference?.referenceSlug === referenceSlug)?.reference?.authorName,
    to: `/quotes/reference/${referenceSlug}`,
  })).sort((a, b) => (a.label ?? '').localeCompare(b.label ?? ''))
})

const categories = computed(() => {
  const categories = [...new Set(quotes.value.flatMap(quote => quote.categories))].filter(Boolean)

  return categories.map(category => ({
    label: category,
    to: `/quotes/category/${slugify(category)}`,
  })).sort((a, b) => (a.label ?? '').localeCompare(b.label ?? ''))
})

const dropdownItems = ref<NavigationMenuItem[]>([
  {
    label: 'Authors',
    icon: 'ph:user-duotone',
    children: authors.value,
  },
  {
    label: 'Literature',
    icon: 'ph:book-bookmark-duotone',
    children: references.value,
  },
  {
    label: 'Categories',
    icon: 'ph:tag-duotone',
    children: categories.value,
  },
])
</script>

<template>
  <UNavigationMenu
    :items="dropdownItems" :ui="{
      childList: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    }" popover
  />
</template>
