<script setup lang="ts">
import type { Collection, Post } from '~/types'

const props = defineProps<{ collection: Collection, post: Post }>()

const { data: surroundingPosts } = await useAsyncData(`surroundingPosts/${props.post.slug}`, () => {
  const idx = props.collection.posts.indexOf(props.post.slug)

  const prevPostSlug = idx === 0 ? null : props.collection.posts[idx - 1]
  const nextPostSlug = idx === props.collection.posts.length - 1 ? null : props.collection.posts[idx + 1]

  return Promise.all([
    prevPostSlug ? usePost(prevPostSlug) : null,
    nextPostSlug ? usePost(nextPostSlug) : null,
  ])
})
</script>

<template>
  <div v-if="surroundingPosts" class="flex justify-between mt-10 md:px-10 flex-col sm:flex-row items-center">
    <div>
      <NuxtLink v-if="surroundingPosts[0]" class="btn btn-ghost" :to="`/posts/${surroundingPosts[0].slug}`">
        <Icon name="mdi:arrow-left" />
        {{ surroundingPosts[0].title }}
      </NuxtLink>
    </div>
    <div>
      <NuxtLink v-if="surroundingPosts[1]" class="btn btn-ghost" :to="`/posts/${surroundingPosts[1].slug}`">
        {{ surroundingPosts[1].title }}
        <Icon name="mdi:arrow-right" />
      </NuxtLink>
    </div>
  </div>
</template>
