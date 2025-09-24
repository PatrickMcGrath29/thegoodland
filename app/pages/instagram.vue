<script setup lang="ts">
import type { Post } from '~/types'

const posts = await useBlogPosts()

const description = 'Literature that highlights the richness of life found in Jesus Christ.'

useSeoMeta({
  title: 'The Good Land Blog',
  description,
  ogDescription: description,
})

const highlightedPostSlugs = [
  '2025-03-13-awake-my-glory-stirring-up-our-minds-for-christ',
  '2023-06-07-lord-make-me-a-man-after-thine-own-heart',
]

const highlightedPosts = computed(() => {
  if (!posts)
    return []

  return highlightedPostSlugs
    .map(slug => posts.find(p => p.slug === slug))
    .filter(Boolean) as Post[]
})
</script>

<template>
  <ContainerMedium>
    <PageHeader heading="Instagram Posts" :subheading="description" />

    <div v-if="highlightedPosts" class="flex gap-4 flex-col">
      <VerticalPostPreview v-for="post in highlightedPosts" :key="post.slug" :post="post" />
    </div>
  </ContainerMedium>
</template>
