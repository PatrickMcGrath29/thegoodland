<script setup lang="ts" generic="T">
import type { TextLink } from '~/types'

const { buttonText, contentRecords } = defineProps<{
  buttonText: string
  contentRecords: TextLink[]
}>()

const inputFilter: Ref<string> = ref('')

const filteredContentRecords = computed(() => {
  return contentRecords.filter((record) => {
    return normalizeInput(record.text).includes(normalizeInput(inputFilter.value))
  })
})

async function goTo(path: string) {
  await navigateTo(path)
}

const overlayPanelRef = ref()
function toggleOverlayPanel(event: any) {
  overlayPanelRef.value.toggle(event)
  inputFilter.value = ''
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
    <div class="border my-1 p-4 rounded-sm border-accent border-opacity-20 bg-base-300 shadow-lg grid gap-1">
      <div class="sticky pb-2">
        <input
          v-model="inputFilter" type="text" placeholder="Filter..."
          class="input w-full border-none input-sm bg-base-200 rounded-sm" autofocus
        >
      </div>
      <div class="overflow-scroll h-80">
        <div
          v-for="(record, idx) in filteredContentRecords" :key="idx"
          class="cursor-pointer hover:bg-neutral-700 p-1.5 rounded-sm w-60 text-ellipsis text-nowrap overflow-hidden"
          @click="() => goTo(record.link)"
        >
          {{ record.text }}
          <div v-if="record.textSubtitle" class="text-xs">
            {{ record.textSubtitle }}
          </div>
        </div>
      </div>
    </div>
  </OverlayPanel>
</template>
