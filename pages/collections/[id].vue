<script setup lang="ts">
import type { Collection } from '~/types'

const { params: { id: collectionId } } = useRoute()

const { data: collectionData } = await useAsyncData(`collection/${collectionId}}`, () => useCollection(collectionId as string))

if (!collectionData)
  throw new Error('Collection not found')

const collection = collectionData as Ref<Collection>

const { data: posts } = await useAsyncData(
  () => usePostsById(collection.value.posts.map(({ post }) => post)),
)
</script>

<template>
  <div v-for="(post, idx) in posts" :key="idx">
    <NuxtLink :to="`/posts/${post.path}`">
      {{ post.title }}
    </NuxtLink>
  </div>
</template>
