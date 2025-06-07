<script setup lang="ts">
import type { Quote } from '~/types'
import { smartEllipsis } from '~/shared/utils'

defineProps<{
  quote: Quote
}>()

defineEmits<{
  click: [quote: Quote]
}>()
</script>

<template>
  <div
    class="flex-none w-96 h-80"
    @click="$emit('click', quote)"
  >
    <StyledCard class="h-full cursor-pointer hover:shadow-xl transition-all duration-300">
      <div class="p-5 h-full flex flex-col">
        <div class="flex-grow overflow-hidden">
          <p class="text-base leading-relaxed line-clamp-8">
            "{{ smartEllipsis(quote.text, 350) }}"
          </p>
        </div>
        <div v-if="quote.reference" class="text-sm text-neutral-400 mt-4 pt-3 border-t border-neutral-700 flex-shrink-0">
          <div v-if="quote.reference.authorName" class="font-medium">
            — {{ quote.reference.authorName }}
          </div>
          <div v-if="quote.reference.referenceName" class="text-xs mt-1 truncate">
            {{ quote.reference.referenceName }}
          </div>
        </div>
      </div>
    </StyledCard>
  </div>
</template>
