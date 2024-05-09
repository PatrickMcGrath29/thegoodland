<script setup lang="ts">
defineProps<{ text: string, content: string }>()

const overlayRef = ref()

const buttonRef = ref()
const tooltipRef = ref()

const isButtonHovered = useElementHover(buttonRef)
const isOverlayHovered = useElementHover(tooltipRef)

function mouseOver(event: Event) {
  overlayRef.value.show(event)
}
function mouseLeave() {
  setTimeout(() => {
    if (!isButtonHovered.value && !isOverlayHovered.value)
      overlayRef.value.hide()
  }, 500)
}
</script>

<template>
  <button ref="buttonRef" @mouseenter="mouseOver" @mouseleave="mouseLeave">
    <sup class="text-blue-500 underline">
      {{ text }}
    </sup>
  </button>
  <OverlayPanel ref="overlayRef">
    <RefTagger />
    <div ref="tooltipRef" class="p-3 bg-neutral-800 max-w-[350px]" @mouseleave="mouseLeave">
      {{ content }}
    </div>
  </OverlayPanel>
</template>
