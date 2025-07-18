<script setup lang="ts">
import type { Quote } from '~~/types'

defineProps<{
  quote: Quote
}>()
</script>

<template>
  <div>
    <p class="whitespace-pre-wrap text-base">
      <span class="text-lg">{{ quote.text }}</span>
    </p>

    <div class="pt-8">
      <div
        v-if="quote.reference?.referenceName" class="card-title text-base font-bold"
        :to="`/quotes/reference/${quote.reference?.referenceSlug}`"
      >
        {{ quote.reference.referenceName }}
      </div>
      <div
        class="text-sm italic"
        :to="quote.reference?.authorName ? `/quotes/author/${quote.reference?.authorSlug}` : ''"
      >
        by {{ quote.reference?.authorName || "Anonymous" }}
      </div>
    </div>
  </div>
</template>
