<script setup lang="ts">
import type { Quote } from '~/types'

defineProps<{
  quote: Quote
}>()
</script>

<template>
  <div>
    <div>
      <p class="whitespace-pre-wrap text-base">
        {{ quote.text }}
      </p>

      <div class="pt-4">
        <h4 v-if="quote.reference?.referenceName" class="card-title text-base font-bold">
          {{ quote.reference.referenceName }}
        </h4>
        <h5 class="text-sm italic">
          by {{ quote.reference?.authorName || "Anonymous" }}
        </h5>
      </div>
    </div>
    <div v-if="quote.link || quote.reference?.link" class="text-sm text-blue-300 pt-1 mt-3 flex gap-3">
      <a :href="quote.link || quote.reference?.link" class="flex items-center gap-1 hover:underline" nofollow>
        <Icon name="ci:external-link" />
        Continue Reading
      </a>
    </div>
  </div>
</template>
