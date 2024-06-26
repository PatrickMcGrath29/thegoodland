<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `The Good Land - ${titleChunk}` : 'The Good Land Blog'
  },
  htmlAttrs: {
    lang: 'en',
  },
})

useSeoMeta({
  ogSiteName: 'The Good Land Blog',
})
</script>

<template>
  <div tabindex="0">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
