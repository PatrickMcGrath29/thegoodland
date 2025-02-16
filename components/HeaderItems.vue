<script setup lang="ts">
import type { Collection } from '~/types'

function clickHandler() {
  if (document.activeElement instanceof HTMLElement)
    document.activeElement.blur()
}

const { data: collectionResult } = await useAsyncData('primaryCollection', () => useCollection('new-life-lessons-andrew-murray'))
const primaryCollection = collectionResult as Ref<Collection>
</script>

<template>
  <li>
    <NuxtLink to="/posts" @click="clickHandler">
      Blog Posts
    </NuxtLink>
  </li>
  <li>
    <NuxtLink :to="`/collections/${primaryCollection.slug}`" @click="clickHandler">
      {{ primaryCollection.name }}
    </NuxtLink>
  </li>
  <li>
    <NuxtLink to="/collections" @click="clickHandler">
      Collections
    </NuxtLink>
  </li>
  <li>
    <NuxtLink to="/quotes" @click="clickHandler">
      Quotes
    </NuxtLink>
  </li>
</template>
