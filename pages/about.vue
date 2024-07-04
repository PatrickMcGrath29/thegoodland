<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

const { data: aboutPageData } = await useAsyncData(() => {
  return queryContent('pages/about').findOne()
})

const aboutPage = aboutPageData as Ref<ParsedContent>
</script>

<template>
  <ContainerSmall>
    <div>
      <div class="text-4xl font-semibold my-10">
        About
      </div>
      <RefTagger>
        <ContentRenderer
          :value="aboutPage"
          class="[&>*]:max-w-screen-md [&>*]:mx-auto [&>section]:mt-10 [&_a.rtBibleRef]:underline [&_a.rtBibleRef]:decoration-1 [&_a.rtBibleRef]:underline-offset-2"
        />
      </RefTagger>
    </div>
  </ContainerSmall>
</template>
