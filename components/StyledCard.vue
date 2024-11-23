<script setup lang="ts">
const { highlightedState = 'hover', scale = true } = defineProps<{ highlightedState?: 'active' | 'disabled' | 'hover', scale?: boolean }>()
</script>

<template>
  <div
    v-if="highlightedState === 'active'"
    class="bg-base-200 border rounded shadow-lg border-accent border-opacity-20 transition-all duration-300"
  >
    <slot />
  </div>

  <div v-else-if="highlightedState === 'disabled'" class="bg-base-200 border border-base-300 rounded">
    <slot />
  </div>

  <div
    v-else-if="highlightedState === 'hover' && scale"
    class="bg-base-200 border border-base-300 rounded hover:shadow-lg hover:border-accent hover:border-opacity-20 hover:scale-[1.01] transition-all duration-300"
  >
    <slot />
  </div>
  <div
    v-else-if="highlightedState === 'hover'"
    class="bg-base-200 border border-base-300 rounded hover:shadow-lg hover:border-accent hover:border-opacity-20 transition-all duration-300"
  >
    <slot />
  </div>
</template>
