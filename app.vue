<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `Quotes - ${titleChunk}` : 'Quotes'
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
