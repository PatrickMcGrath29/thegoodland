<script setup lang="ts">
defineProps<{ text: string, content: string }>()

const overlayRef = ref()

function toggle(event) {
  overlayRef.value.toggle(event)
}
</script>

<template>
  <button @click="toggle">
    <sup class="text-blue-500 underline">
      {{ text }}
    </sup>
  </button>
  <OverlayPanel ref="overlayRef">
    <RefTagger />
    <div class="p-3 m-3 bg-neutral-800 max-w-[350px]">
      {{ content }}
    </div>
  </OverlayPanel>
</template>
