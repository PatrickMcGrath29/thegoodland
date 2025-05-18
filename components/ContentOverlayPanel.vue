<script setup lang="ts" generic="T">
import type { TextLink } from '~/types'
import { normalizeInput } from '~/shared/utils'

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
</script>

<template>
  <USelectMenu
    :items="filteredContentRecords" :filter-fields="['text']" label-key="text" :placeholder="buttonText"
    class="grow sm:max-w-80"
  >
    <template #item="{ item }">
      <div>
        {{ item.text }}
        <div v-if="item.textSubtitle" class="text-xs">
          {{ item.textSubtitle }}
        </div>
      </div>
    </template>
  </USelectMenu>
</template>
