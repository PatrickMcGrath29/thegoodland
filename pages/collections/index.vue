<script setup lang="ts">
const { data: collections } = await useAsyncData('allCollections', () => useCollections())
</script>

<template>
  <div v-for="(collection, idx) in collections" :key="idx">
    <NuxtLink :to="`/collections/${collection.slug}`">
      {{ collection.name }}
    </NuxtLink>
  </div>
</template>
