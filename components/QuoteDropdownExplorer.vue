<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { Quote } from '~/types'

const { data } = await useAsyncData('useQuotes', () => useQuotes())
const quotes = data as Ref<Quote[]>

const searchAuthors = ref('')

const REGEX_TO_SANITIZE_SEARCH = /[^a-z0-9]/gi

const authors = computed(() => {
  const sanitizedSearch = searchAuthors.value.toLowerCase().replace(REGEX_TO_SANITIZE_SEARCH, '')
  return useQuoteAuthors(quotes.value).filter(
    author => searchAuthors.value.length === 0 || author.name.toLowerCase().replace(REGEX_TO_SANITIZE_SEARCH, '').includes(sanitizedSearch),
  ).map(author => ({
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

const dropdownItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Authors',
    icon: 'ph:user-duotone',
    children: authors.value,
    slot: 'authors',
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
    disable-hover-trigger disable-pointer-leave-close :items="dropdownItems" :ui="{
      childList: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
      link: 'cursor-pointer',
      linkTrailingIcon: 'cursor-default',
    }"
  >
    <template #authors-content="{ item }: { item: any }">
      <div class="flex flex-col gap-4 w-full">
        <div class="px-3 pt-4 w-full">
          <UInput v-model="searchAuthors" placeholder="Search Authors" class="w-full" autofocus color="primary" variant="soft" />
        </div>

        <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <li v-for="child in item.children" :key="child.label" class="w-full px-1.5 py-1">
            <ULink class="text-sm text-left rounded-md p-3 transition-colors hover:bg-elevated/50 cursor-pointer w-full block" :to="child.to">
              <p class="font-medium text-highlighted">
                {{ child.label }}
              </p>
              <p class="text-muted line-clamp-2">
                {{ child.description }}
              </p>
            </ULink>
          </li>
        </ul>
      </div>
    </template>
  </UNavigationMenu>
</template>
