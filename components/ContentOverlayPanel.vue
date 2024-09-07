<script setup lang="ts" generic="T">
import type { TextLink } from '~/types'

defineProps<{
  buttonText: string
  contentRecords: TextLink[]
}>()

async function goTo(path: string) {
  await navigateTo(path)
}

const overlayPanelRef = ref()
function toggleOverlayPanel(event: any) {
  overlayPanelRef.value.toggle(event)
}
</script>

<template>
  <div class="grow sm:grow-0">
    <Button
      type="button" aria-haspopup="true" aria-controls="overlay_menu" pt:root="btn w-full"
      @click="toggleOverlayPanel"
    >
      {{ buttonText }}
    </Button>
  </div>

  <OverlayPanel ref="overlayPanelRef">
    <div
      class="border my-1 p-4 rounded-md border-accent border-opacity-20 bg-base-300 shadow-lg grid md:grid-cols-3 gap-1 max-h-96 overflow-scroll"
    >
      <div
        v-for="(record, idx) in contentRecords" :key="idx"
        class="cursor-pointer hover:bg-neutral-700 p-1.5 rounded max-w-72 text-ellipsis text-nowrap overflow-hidden" @click="() => goTo(record.link)"
      >
        {{ record.text }}
      </div>
    </div>
  </OverlayPanel>
</template>
