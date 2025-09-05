<script setup lang="ts">
import type { CommandPaletteItem } from '@nuxt/ui'
import { highlight } from '~~/shared/utils'

const props = defineProps<{
  item: CommandPaletteItem
  searchTerm: string
}>()

const suffix = computed(() => {
  const highlightedSuffix = highlight({
    item: props.item,
    searchTerm: props.searchTerm,
    forceKey: 'suffix',
    truncate: false,
  })

  if (highlightedSuffix) {
    return highlightedSuffix
  }
  else {
    return props.item.suffix
  }
})
</script>

<template>
  <div class="text-left p-0.5 w-full [&_mark]:bg-accent">
    <div
      v-if="item.labelHtml" class="overflow-ellipsis max-w-[100ch] text-nowrap overflow-hidden"
      v-html="item.labelHtml"
    />
    <div v-else class="overflow-ellipsis max-w-[100ch] text-nowrap overflow-hidden">
      {{ item.label }}
    </div>

    <div v-if="suffix" class="text-sm text-dimmed" v-html="suffix" />
  </div>
</template>
