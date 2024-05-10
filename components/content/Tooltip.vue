<script setup lang="ts">
defineProps<{ text: string, content: string }>()

const overlayRef = ref()

function toggleOverlay(event: Event) {
  overlayRef.value.toggle(event)
}
</script>

<template>
  <button class="p-0.5" @click="toggleOverlay">
    <sup class="text-blue-500 underline">
      {{ text }}
    </sup>
  </button>
  <OverlayPanel ref="overlayRef">
    <RefTagger />
    <div class="p-4 bg-neutral-900 max-w-[500px] rounded border border-neutral-600">
      {{ content }}
    </div>
  </OverlayPanel>
</template>
