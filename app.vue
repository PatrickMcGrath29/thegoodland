<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `The Good Land - ${titleChunk}` : 'The Good Land'
  },
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<template>
  <div tabindex="0">
    <Header />
    <NuxtPage />
    <Footer />
  </div>
</template>
