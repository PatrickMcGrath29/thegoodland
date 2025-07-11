<script setup lang="ts">
import type { Quote } from '~/types'

const { quote, showFullPageLink = true } = defineProps<{
  quote: Quote
  showFullPageLink?: boolean
}>()
</script>

<template>
  <div class="mb-6 pr-8">
    <QuoteText :quote="quote" :show-perma-link="false" />
  </div>
  <div class="flex flex-wrap gap-5 items-center justify-between w-full">
    <div class="flex flex-wrap gap-2">
      <span v-for="category in quote.categories" :key="category" class="px-2 py-1 bg-neutral-700 rounded text-xs text-toned">
        {{ category }}
      </span>
    </div>
    <div>
      <UButton
        v-if="showFullPageLink" :to="`/quotes/${quote.uuid}/${quote.slug}`" trailing-icon="ph:arrow-right"
        variant="ghost" color="primary" size="sm"
      >
        View Full Page
      </UButton>
    </div>
  </div>
</template>
