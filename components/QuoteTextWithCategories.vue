<script setup lang="ts">
import type { Quote } from '~/types'
import { slugify } from '~/shared/utils'

const { quote, showFullPageLink = true, previewMode = false } = defineProps<{
  quote: Quote
  showFullPageLink?: boolean
  previewMode?: boolean
}>()
</script>

<template>
  <div class="mb-6">
    <QuoteText :quote="quote" :show-perma-link="false" :preview-mode="previewMode" />
  </div>
  <div class="flex flex-wrap gap-5 items-center justify-between w-full">
    <div class="flex flex-wrap gap-2">
      <UButton
        v-for="category in quote.categories" :key="category" size="xs" variant="soft" color="neutral"
        class="bg-neutral-700" :to="`/quotes/category/${slugify(category)}`"
      >
        {{ category }}
      </UButton>
    </div>
    <div v-if="!previewMode">
      <UButton
        v-if="showFullPageLink" :to="`/quotes/${quote.uuid}/${quote.slug}`" trailing-icon="ph:arrow-right"
        variant="ghost" color="primary" size="sm"
      >
        View Full Page
      </UButton>
    </div>
  </div>
</template>
