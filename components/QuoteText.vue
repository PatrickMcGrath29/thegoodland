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
        <NuxtLink
          v-if="quote.reference?.referenceName" class="card-title text-base font-bold"
          :to="`/quotes/reference/${quote.reference?.referenceSlug}`"
        >
          {{ quote.reference.referenceName }}
        </NuxtLink>
        <NuxtLink
          class="text-sm italic"
          :to="quote.reference?.authorName ? `/quotes/author/${quote.reference?.authorSlug}` : ''"
        >
          by {{ quote.reference?.authorName || "Anonymous" }}
        </NuxtLink>
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
