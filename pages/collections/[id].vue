<script setup lang="ts">
import type { Collection } from '~/types'

const { params: { id: collectionId } } = useRoute()

const { data: collectionData } = await useAsyncData(`collection/${collectionId}}`, () => useCollection(collectionId as string))
const collection = collectionData as Ref<Collection>

const { data: posts } = await useAsyncData(
  () => usePostsBySlug(collection.value.posts),
)
</script>

<template>
  <ContainerMedium>
    <div class="mt-10">
      <h1 class="text-4xl font-semibold text-center">
        {{ collection.name }}
      </h1>
    </div>
    <div class="my-10 flex flex-col gap-8 md:gap-12 mx-1">
      <PostPreview v-for="post in posts" :key="post.slug" :post="post" />
    </div>
  </ContainerMedium>
</template>
