<script setup lang="ts">
defineProps<{ text: string, content: string }>()

const overlayRef = ref()
const buttonRef = ref()
const tooltipRef = ref()

const isTooltipOpen = ref(false)

const isButtonHovered = useElementHover(buttonRef)
const isOverlayHovered = useElementHover(tooltipRef)

const isTooltipHovered = computed(() => {
  return isButtonHovered.value || isOverlayHovered.value
})

function mouseEnter(event: Event) {
  overlayRef.value.show(event)
  isTooltipOpen.value = true
}

function shouldCloseTooltip() {
  return isTooltipOpen.value && !isTooltipHovered.value && !isBibleTooltipOpen()
}

function mouseLeave() {
  setTimeout(() => {
    if (shouldCloseTooltip()) {
      overlayRef.value.hide()
      isTooltipOpen.value = false
    }
    else if (isTooltipOpen.value && !isTooltipHovered.value) {
      const interval = setInterval(() => {
        if (shouldCloseTooltip()) {
          overlayRef.value.hide()
          isTooltipOpen.value = false
          clearInterval(interval)
        }
      }, 500)
    }
  }, 500)
}

function isBibleTooltipOpen() {
  return document.querySelectorAll('div.rtTooltip').length > 0
}
</script>

<template>
  <button ref="buttonRef" class="p-0.5" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
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
