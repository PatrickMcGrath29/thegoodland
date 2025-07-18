<script setup lang="ts">
import type { Collection } from '~/types'
import { smartEllipsis } from '~/shared/utils'

const route = useRoute()

const collectionId = computed(() => route.params.id as string)

const { data: collectionData, error } = await useAsyncData(
  `collection/${collectionId.value}}`,
  () => useCollection(collectionId.value),
  { watch: [collectionId] },
)

if (error.value)
  throw createError({ statusMessage: 'Collection Not Found', statusCode: 404 })

const collection = collectionData as Ref<Collection>

const { data: posts } = await useAsyncData(
  `collection/posts/${collectionId.value}}`,
  () => usePostsBySlug(collection.value.posts),
  { watch: [collectionId] },
)

const seoTitle = computed(() => {
  return `${collection.value.name} by ${collection.value.author}`
})

const seoDescription = computed(() => {
  return smartEllipsis(collection.value.summary, 160)
})

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  ogImage: collection.value.featuredImage ? useSeoImage(collection.value.featuredImage) : undefined,
})
</script>

<template>
  <Container>
    <div v-if="collection.featuredImage" class="my-5">
      <NuxtImg
        :src="collection.featuredImage" height="1000px" class="w-full h-96 object-cover rounded-lg"
        :alt="`Featured image for ${collection.name}`"
      />
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
    <div class="gap-10 my-10 card">
      <div class="whitespace-pre-line mb-8">
        {{ collection.summary }}
      </div>
      <div class="gap-4 columns-xs">
        <NuxtLink
          v-for="(post, idx) in posts" :key="idx" :to="`/posts/${post.slug}`"
          class="p-3 block bg-neutral-700 hover:bg-neutral-800 rounded mb-4"
          prefetch-on="interaction"
        >
          {{ post.title }}
        </NuxtLink>
      </div>
    </div>
  </ContainerMedium>
</template>
