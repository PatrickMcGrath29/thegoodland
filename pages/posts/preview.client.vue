<script setup lang="ts">
import { parseMarkdown } from '@nuxtjs/mdc/runtime'

declare global {
  interface Window {
    previewDataCMS: any
  }
}

interface CMSData {
  body: string
}

definePageMeta({
  layout: 'blank',
})

const previewData = ref<CMSData | null>(null)

const renderedMarkdown = computedAsync(async () => {
  if (!previewData.value)
    return

  return await parseMarkdown(
    previewData.value.body,
  )
})

onMounted(() => {
  setInterval(() => {
    if (window.parent.parent.previewDataCMS)
      previewData.value = window.parent.parent.previewDataCMS
  }, 1000)
})
</script>

<template>
  <ContainerMedium>
    <div v-if="renderedMarkdown" class="mx-4 my-8">
      <ContentRenderer :value="renderedMarkdown" />
    </div>
  </ContainerMedium>
</template>
