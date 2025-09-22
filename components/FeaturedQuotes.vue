<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const quotes = await useQuotes()

const quoteCategories = useQuoteCategories(quotes)
const quoteAuthors = useQuoteAuthors(quotes)
const quoteReferences = useQuoteReferences(quotes)

const featuredCategories = quoteCategories.sort((a, b) => b.count - a.count).slice(0, 20)
const featuredAuthors = quoteAuthors.sort((a, b) => b.count - a.count).slice(0, 20)
const featuredReferences = quoteReferences.sort((a, b) => b.count - a.count).slice(0, 15)

const activeTab = ref('categories')

const tabItems: TabsItem[] = [
  {
    label: 'Categories',
    value: 'categories',
    icon: 'ph:tag-duotone',
  },
  {
    label: 'Authors',
    value: 'authors',
    icon: 'ph:user-duotone',
  },
  {
    label: 'Books',
    value: 'references',
    icon: 'ph:book-bookmark-duotone',
  },
]
</script>

<template>
  <div class="mt-16 mb-24">
    <SectionHeader heading="Explore Quotes" subheading="See All" link="/quotes" />

    <div class="flex flex-col md:flex-row items-center gap-10">
      <div class="col-span-1 basis-1/2">
        <div class="mb-4">
          <UTabs v-model="activeTab" :items="tabItems" variant="link" size="sm" />
        </div>

        <div v-if="activeTab === 'categories'" class="space-x-2 space-y-2">
          <UButton v-for="(category, idx) in featuredCategories" :key="idx" variant="soft" :to="category.slug">
            {{ category.name }}
          </UButton>
        </div>
        <div v-else-if="activeTab === 'authors'" class="space-x-2 space-y-2">
          <UButton v-for="(author, idx) in featuredAuthors" :key="idx" variant="soft" :to="author.slug">
            {{ author.name }}
          </UButton>
        </div>
        <div v-else-if="activeTab === 'references'" class="space-x-2 space-y-2">
          <UButton v-for="(reference, idx) in featuredReferences" :key="idx" variant="soft" :to="reference.slug">
            {{ reference.referenceName }}
          </UButton>
        </div>
      </div>

      <div class="col-span-1 basis-1/2">
        <div class="text-2xl text-toned leading-1.2">
          “Come, let the proud man boast in his honor, and the mighty man is his valor, and the rich man in his
          wealth, but let the Christian pronounce himself happy, only happy, truly happy, fully happy in beholding
          Christ,
          enjoying Christ, having Christ, in looking unto Jesus.”
        </div>
        <div class="font-semibold mt-2 text-muted">
          — Isaac Ambrose
        </div>
      </div>
    </div>
  </div>
</template>
