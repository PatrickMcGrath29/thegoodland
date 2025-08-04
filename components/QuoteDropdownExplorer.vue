<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { Quote } from '~/types'
import { slugify } from '~/shared/utils'

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

const authors = computed(() => {
  const countByAuthorSlug = quotes.value.reduce((acc: Record<string, number>, q) => {
    if (q.reference?.authorSlug && acc[q.reference.authorSlug]) {
      acc[q.reference.authorSlug]++
    }
    else if (q.reference?.authorSlug) {
      acc[q.reference.authorSlug] = 1
    }

    return acc
  }, {})

  const authorSlugs = [...new Set(quotes.value.map(quote => quote.reference?.authorSlug))]

  return authorSlugs.map((authorSlug) => {
    const label = quotes.value.find(quote => quote.reference?.authorSlug === authorSlug)?.reference?.authorName ?? 'Unknown'
    const quoteCount = countByAuthorSlug[authorSlug as string]

    return {
      label: `${label} (${quoteCount})`,
      to: `/quotes/author/${authorSlug}`,
    }
  }).sort((a, b) => (a.label ?? '').localeCompare(b.label ?? ''))
})

const references = computed(() => {
  const referenceSlugs = [...new Set(quotes.value.filter(quote => quote.reference?.referenceSlug).map(quote => quote.reference?.referenceSlug))]
  const countByReferenceSlugs = quotes.value.reduce((acc: Record<string, number>, q) => {
    if (q.reference?.referenceSlug && acc[q.reference.referenceSlug]) {
      acc[q.reference.referenceSlug]++
    }
    else if (q.reference?.referenceSlug) {
      acc[q.reference.referenceSlug] = 1
    }

    return acc
  }, {})

  return referenceSlugs.map((referenceSlug) => {
    const label = quotes.value.find(quote => quote.reference?.referenceSlug === referenceSlug)?.reference?.referenceName
    const desc = quotes.value.find(quote => quote.reference?.referenceSlug === referenceSlug)?.reference?.authorName
    const quoteCount = countByReferenceSlugs[referenceSlug as string]

    return {
      label: `${label} (${quoteCount})`,
      description: desc,
      to: `/quotes/reference/${referenceSlug}`,
    }
  }).sort((a, b) => (a.label ?? '').localeCompare(b.label ?? ''))
})

const categories = computed(() => {
  const categories = [...new Set(quotes.value.flatMap(quote => quote.categories))].filter(Boolean)
  const countByCategory = quotes.value.reduce((acc: Record<string, number>, q) => {
    if (q.reference?.referenceSlug && acc[q.reference.referenceSlug]) {
      acc[q.reference.referenceSlug]++
    }
    else if (q.reference?.referenceSlug) {
      acc[q.reference.referenceSlug] = 1
    }

    return acc
  }, {})

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
    disable-hover-trigger
    disable-pointer-leave-close
    :items="dropdownItems" :ui="{
      childList: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
      link: 'cursor-pointer',
      linkTrailingIcon: 'cursor-default',
    }" popover
  />
</template>
