<script setup lang="ts">
import type { Quote } from '~~/types'

const props = defineProps<{
  quotes: Quote[]
}>()

const references = computed(() => {
  const referenceIds: string[] = []
  const references = []

  for (const quote of props.quotes) {
    if (quote.reference && !referenceIds.includes(quote.reference?.uuid) && quote.reference.referenceName) {
      referenceIds.push(quote.reference?.uuid)
      references.push(quote.reference)
    }
  }

  return references
})
</script>

<template>
  <div v-if="references.length > 1">
    <div class="flex overflow-auto gap-3 pb-3 mb-3">
      <StyledCard v-for="(reference, idx) in references" :key="idx" :scale="false">
        <NuxtLink
          :to="`/quotes/reference/${reference.referenceSlug}`"
          class="whitespace-nowrap max-w-60 flex px-3 py-2"
        >
          <span class="text-ellipsis overflow-hidden text-sm">
            {{ reference.referenceName }}
          </span>
        </NuxtLink>
      </StyledCard>
    </div>
  </div>
</template>
