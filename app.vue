<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en',
  },
})

useSeoMeta({
  ogSiteName: 'The Good Land Blog',
  title: 'The Good Land Blog',
  ogTitle: 'The Good Land Blog',
})
</script>

<template>
  <div tabindex="0">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
