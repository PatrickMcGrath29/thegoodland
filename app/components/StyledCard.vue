<script setup lang="ts">
const { highlightedState = 'hover', scale = true } = defineProps<{ highlightedState?: 'active' | 'disabled' | 'hover', scale?: boolean }>()
</script>

<template>
  <div
    v-if="highlightedState === 'active'"
    class="bg-neutral-800 border rounded shadow-lg border-accent/20 transition-all duration-300"
  >
    <slot />
  </div>

  <div v-else-if="highlightedState === 'disabled'" class="bg-neutral-800 border border-neutral-800 rounded">
    <slot />
  </div>

  <div
    v-else-if="highlightedState === 'hover' && scale"
    class="bg-neutral-800 border border-neutral-800 rounded hover:shadow-lg hover:border-accent/20 hover:scale-[1.01] transition-all duration-300"
  >
    <slot />
  </div>
  <div
    v-else-if="highlightedState === 'hover'"
    class="bg-neutral-800 border border-neutral-800 rounded hover:shadow-lg hover:border-accent/20 transition-all duration-300"
  >
    <slot />
  </div>
</template>
