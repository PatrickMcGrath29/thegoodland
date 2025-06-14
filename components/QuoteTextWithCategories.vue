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
  <div class="flex flex-col md:flex-row gap-5 items-start justify-between text-sm text-neutral-400 w-full">
    <div class="flex gap-2">
      <span
        v-for="category in quote.categories"
        :key="category"
        class="px-2 py-1 bg-neutral-700 rounded text-xs"
      >
        {{ category }}
      </span>
    </div>
    <NuxtLink
      v-if="quote.uuid"
      :to="`/quotes/${quote.uuid}/${quote.slug}`"
      class="text-accent hover:text-accent/80 text-xs font-medium"
    >
      View Full Page →
    </NuxtLink>
  </div>
</template>
