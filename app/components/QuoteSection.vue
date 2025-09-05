<script setup lang="ts">
import type { Quote } from '~/types'

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
      <UButton
        v-if="viewAllLink" :to="viewAllLink" trailing-icon="ph:arrow-right"
        variant="ghost" color="primary"
      >
        View All
      </UButton>
    </div>
    <div class="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory scroll-px-1">
      <StyledCard
        v-for="(quote, idx) in quotes" :key="idx"
        class="m-0.5 p-3 cursor-pointer flex-none w-[calc(100%-2rem)] md:w-96 snap-start"
        @click="$emit('quoteClick', quote)"
      >
        <QuoteText :quote="quote" preview-mode :show-full-page-link="false" />
      </StyledCard>
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
