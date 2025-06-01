<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import type { Quote } from '~/types'

const { data } = await useAsyncData('fetchQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

const items = [
  {
    label: 'Authors',
    icon: 'i-lucide-user',
    slot: 'authors' as const,
  },
  {
    label: 'References',
    icon: 'i-lucide-book',
    slot: 'references' as const,
  },
  {
    label: 'Categories',
    icon: 'i-lucide-tag',
    slot: 'categories' as const,
  },
] satisfies TabsItem[]

const authors = computed(() => {
  const authorSlugs = [...new Set(quotes.value.map(quote => quote.reference?.authorSlug))]

  return authorSlugs.map(authorSlug => ({
    text: quotes.value.find(quote => quote.reference?.authorSlug === authorSlug)?.reference?.authorName ?? 'Unknown',
    path: `/quotes/authors/${authorSlug}`,
    quoteCount: quotes.value.filter(quote => quote.reference?.authorSlug === authorSlug).length,
  }))
})

const references = computed(() => {
  const referenceSlugs = [...new Set(quotes.value.map(quote => quote.reference?.referenceSlug))]

  return referenceSlugs.map(referenceSlug => ({
    text: quotes.value.find(quote => quote.reference?.referenceSlug === referenceSlug)?.reference?.referenceName ?? 'Unknown',
    path: `/quotes/reference/${referenceSlug}`,
    quoteCount: quotes.value.filter(quote => quote.reference?.referenceSlug === referenceSlug).length,
  }))
})

const categories = computed(() => {
  const categories = [...new Set(quotes.value.flatMap(quote => quote.categories))]

  return categories.map(category => ({
    text: category,
    path: `/categories/${category}`,
    quoteCount: quotes.value.filter(quote => quote.categories.includes(category)).length,
  }))
})
</script>

<template>
  <div>
    <UTabs :items="items" class="w-full my-4" variant="link">
      <template #authors>
        <div class="flex flex-wrap gap-2 my-4">
          <div v-for="author in authors" :key="author.text">
            <UButton :label="`${author.text} (${author.quoteCount})`" :to="author.path" variant="outline" color="neutral" />
          </div>
        </div>
      </template>
      <template #references>
        <div class="flex flex-wrap gap-2 my-4">
          <div v-for="reference in references" :key="reference.text">
            <UButton :label="`${reference.text} (${reference.quoteCount})`" :to="reference.path" variant="outline" color="neutral" />
          </div>
        </div>
      </template>
      <template #categories>
        <div class="flex flex-wrap gap-2 my-4">
          <div v-for="category in categories" :key="category.text">
            <UButton :label="`${category.text} (${category.quoteCount})`" :to="category.path" variant="outline" color="neutral" />
          </div>
        </div>
      </template>
    </UTabs>
  </div>
</template>
