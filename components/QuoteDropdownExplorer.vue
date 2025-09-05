<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { Quote } from '~/types'

const { data } = await useAsyncData('useQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

const authors = computed(() => {
  return useQuoteAuthors(quotes.value).map(author => ({
    label: `${author.name} (${author.count})`,
    to: author.slug,
  }))
})

const references = computed(() => {
  return useQuoteReferences(quotes.value).map(reference => ({
    label: `${reference.referenceName} (${reference.count})`,
    description: reference.authorName,
    to: reference.slug,
  }))
})

const categories = computed(() => {
  return useQuoteCategories(quotes.value).map(category => ({
    label: `${category.name} (${category.count})`,
    to: category.slug,
  }))
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
    disable-hover-trigger
    disable-pointer-leave-close
    :items="dropdownItems" :ui="{
      childList: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
      link: 'cursor-pointer',
      linkTrailingIcon: 'cursor-default',
    }"
  />
</template>
