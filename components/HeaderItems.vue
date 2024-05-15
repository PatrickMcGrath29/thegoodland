<script setup lang="ts">
function clickHandler() {
  if (document.activeElement instanceof HTMLElement)
    document.activeElement.blur()
}

const { data: collections } = await useAsyncData('collections', () => useCollections())
</script>

<template>
  <li>
    <NuxtLink to="/posts" @click="clickHandler">
      Blog Posts
    </NuxtLink>
  </li>
  <li v-for="(collection, idx) in collections" :key="idx">
    <NuxtLink :to="`/collections/${collection.slug}`" @click="clickHandler">
      {{ collection.name }}
    </NuxtLink>
  </li>
  <li><a href="https://quotes.thegoodland.io">Quotes</a></li>
  <Search />
</template>
