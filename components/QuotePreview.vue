<script setup lang="ts">
import type { Quote } from '~/types'

defineProps<{
  quote: Quote
}>()

defineEmits<{
  click: [quote: Quote]
}>()
</script>

<template>
  <StyledCard
    class="m-0.5 p-3 cursor-pointer flex-none w-[calc(100%-2rem)] md:w-96"
    @click="$emit('click', quote)"
  >
    <QuoteTextWithCategories :quote="quote" preview-mode :show-full-page-link="false" />
  </StyledCard>
</template>
