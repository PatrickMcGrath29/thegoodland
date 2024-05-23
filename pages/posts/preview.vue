<script setup lang="ts">
import markdownParser from '@nuxt/content/transformers/markdown'

declare global {
  interface Window {
    previewDataCMS: any
  }
}

interface CMSData {
  body: string
}

definePageMeta({
  layout: 'minimal',
})

const previewData = ref<CMSData | null>(null)

const renderedMarkdown = computedAsync(async () => {
  if (!previewData.value)
    return

  // @ts-expect-error markdownParser is valid
  return await await markdownParser.parse(
    `postBody`,
    previewData.value.body,
    {},
  )
})

onMounted(() => {
  setInterval(() => {
    let current = window
    let n = 0
    while (current.parent && n < 10) {
      current = current.parent
      n += 1
      if (current.previewDataCMS)
        previewData.value = current.previewDataCMS
    }
  }, 1000)
})
</script>

<template>
  <div>
    <div v-if="previewData?.body" class="m-4">
      <ContentRenderer :value="renderedMarkdown" />
    </div>
  </div>
</template>
