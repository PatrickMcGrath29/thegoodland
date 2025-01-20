<script setup lang="ts">
import { createMarkdownParser } from '@nuxtjs/mdc/runtime/parser/index'

declare global {
  interface Window {
    previewDataCMS: any
  }
}

interface CMSData {
  body: string
}

const previewData = ref<CMSData | null>(null)

definePageMeta({
  layout: 'blank',
})

function useMarkdownParser() {
  let parser: Awaited<ReturnType<typeof createMarkdownParser>>

  const parse = async (markdown: string) => {
    if (!parser) {
      parser = await createMarkdownParser()
    }
    return parser(markdown)
  }

  return parse
}

const renderedMarkdown = computedAsync(async () => {
  if (!previewData.value)
    return

  const parser = useMarkdownParser()

  return await parser(
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
