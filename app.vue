<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en',
  },
})

const route = useRoute()
watch(route, () => {
  useCanonicalUrl()
}, { immediate: true })

useSeoMeta({
  ogSiteName: 'The Good Land Blog',
  title: 'The Good Land Blog',
  ogTitle: 'The Good Land Blog',
})
</script>

<template>
  <UApp :toaster="{ position: 'bottom-left' }">
    <NuxtLoadingIndicator color="#ffbf00" :height="1" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
