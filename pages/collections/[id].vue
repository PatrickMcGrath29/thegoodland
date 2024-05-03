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
  <Container>
    <div v-if="collection.featuredImage" class="my-5">
      <NuxtImg :src="collection.featuredImage" height="1000px" class="w-full h-96 object-cover rounded-lg" />
    </div>
  </Container>
  <ContainerMedium>
    <div class="mt-10">
      <h1 class="text-4xl font-semibold">
        {{ collection.name }}
      </h1>
      <h2 class="font-semibold mt-2">
        by {{ collection.author }}
      </h2>
    </div>
    <div class="gap-10 mt-10 card">
      <div>
        {{ collection.summary }}
      </div>
      <div class="gap-4 columns-xs">
        <NuxtLink
          v-for="(post, idx) in posts" :key="idx" :to="`/posts/${post.slug}`"
          class="p-3 block bg-base-200 hover:bg-base-300 rounded mb-4"
        >
          {{ post.title }}
        </NuxtLink>
      </div>
    </div>
  </ContainerMedium>
</template>
