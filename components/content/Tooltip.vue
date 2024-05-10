<script setup lang="ts">
defineProps<{ text: string, content: string }>()

const overlayRef = ref()

const buttonRef = ref()
const tooltipRef = ref()

const isOpen = ref(false)

const isButtonHovered = useElementHover(buttonRef)
const isOverlayHovered = useElementHover(tooltipRef)

const isTooltipHovered = computed(() => {
  return isButtonHovered.value || isOverlayHovered.value
})

function mouseEnter(event: Event) {
  overlayRef.value.show(event)
  isOpen.value = true
}

function isBibleTooltipOpen() {
  return document.querySelectorAll('div.rtTooltip').length > 0
}

function mouseLeave() {
  setTimeout(() => {
    if (!isTooltipHovered.value && !isBibleTooltipOpen()) {
      overlayRef.value.hide()
      isOpen.value = false
    }
  }, 750)
}

onMounted(() => {
  setInterval(() => {
    if (isOpen.value && !isTooltipHovered.value && !isBibleTooltipOpen()) {
      overlayRef.value.hide()
      isOpen.value = false
    }
  }, 750)
})
</script>

<template>
  <button ref="buttonRef" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <sup class="text-blue-500 underline">
      {{ text }}
    </sup>
  </button>
  <OverlayPanel ref="overlayRef">
    <RefTagger />
    <div
      ref="tooltipRef" class="p-4 bg-neutral-900 max-w-[400px] rounded border border-neutral-600"
      @mouseleave="mouseLeave"
    >
      {{ content }}
    </div>
  </OverlayPanel>
</template>
