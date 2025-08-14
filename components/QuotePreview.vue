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
  <StyledCard class="m-0.5 p-3 cursor-pointer" @click="$emit('click', quote)">
    <QuoteTextWithCategories
      :quote="quote" preview-mode class="w-[calc(100%-2rem)] md:w-96 grid auto-rows-auto"
      :show-full-page-link="false"
    />
  </StyledCard>

  <!-- <div class="flex-none w-[calc(100%-2rem)] md:w-96 h-80 m-0.5" @click="$emit('click', quote)">
    <StyledCard class="h-full cursor-pointer">
      <div class="p-3 h-full flex flex-col">
        <div class="flex-grow overflow-hidden">
          <p class="text-base leading-relaxed line-clamp-8 whitespace-pre-line">
            {{ quote.text }}
          </p>
          <p class="text-sm text-muted mt-1">
            Continue Reading...
          </p>
        </div>
        <div
          v-if="quote.reference"
          class="text-sm text-neutral-400 mt-3 pt-3 border-t border-neutral-700 h-12"
        >
          <div v-if="quote.reference.authorName" class="font-medium">
            {{ quote.reference.authorName }}
          </div>
          <div v-if="quote.reference.referenceName" class="text-xs mt-1 truncate">
            {{ quote.reference.referenceName }}
          </div>
        </div>
      </div>
    </StyledCard>
  </div> -->
</template>
