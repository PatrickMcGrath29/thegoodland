<script setup lang="ts">
import type { Quote } from '~~/types'

defineProps<{
  title: string
  quotes: Quote[]
  viewAllLink?: string
}>()

defineEmits<{
  (event: 'quoteClick', quote: Quote): void
}>()
</script>

<template>
  <section class="mb-12 mx-2">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold">
        {{ title }}
      </h2>
      <NuxtLink
        v-if="viewAllLink"
        :to="viewAllLink"
        class="text-accent hover:text-accent/80 text-sm font-medium"
      >
        View All →
      </NuxtLink>
    </div>
    <div class="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory scroll-px-1">
      <QuotePreview
        v-for="(quote, idx) in quotes"
        :key="idx"
        :quote="quote"
        class="snap-start"
        @click="$emit('quoteClick', quote)"
      />
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
