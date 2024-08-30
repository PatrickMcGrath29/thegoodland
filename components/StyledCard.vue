<script setup lang="ts">
defineProps<{ disableHover?: boolean }>()
</script>

<template>
  <div
    class="bg-base-200 border border-base-300 rounded"
    :class="{ 'hover:shadow-lg hover:border-accent hover:border-opacity-20 hover:scale-[1.01] transition-all duration-300': disableHover === false }"
  >
    <slot />
  </div>
</template>
