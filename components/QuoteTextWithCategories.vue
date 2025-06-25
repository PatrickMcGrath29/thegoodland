<script setup lang="ts">
import type { Quote } from '~/types'

defineProps<{
  quote: Quote
}>()
</script>

<template>
  <div class="mb-6 pr-8">
    <QuoteText :quote="quote" :show-perma-link="false" />
  </div>
  <div class="flex flex-col md:flex-row gap-5 md:items-center justify-between w-full">
    <div class="flex gap-2">
      <span v-for="category in quote.categories" :key="category" class="px-2 py-1 bg-neutral-700 rounded text-sm text-toned">
        {{ category }}
      </span>
    </div>
    <div>
      <UButton
        v-if="quote.uuid" :to="`/quotes/${quote.uuid}/${quote.slug}`" trailing-icon="ph:arrow-right"
        variant="ghost" color="primary"
      >
        View Full Page
      </UButton>
    </div>
  </div>
</template>
