<script setup lang="ts">
const props = defineProps<{ count: number }>()

const columnSettings = computed(() => {
  return useColumnSettings(props.count)
})
</script>

<template>
  <div :class="columnSettings">
    <slot />
  </div>
</template>
