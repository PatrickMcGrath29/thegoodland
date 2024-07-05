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
  <div v-if="surroundingPosts" class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-16">
    <div>
      <NuxtLink
        v-if="surroundingPosts[0]" class="btn btn-ghost w-full h-full"
        :to="`/posts/${surroundingPosts[0].slug}`"
      >
        <div class="py-2">
          <div class="text-xm font-light text-neutral-400 mb-3">
            Previous in Series
          </div>
          {{ surroundingPosts[0].title }}
        </div>
      </NuxtLink>
    </div>
    <div>
      <NuxtLink :to="`/collections/${collection.slug}`" class="btn btn-ghost w-full h-full">
        <div class="py-2">
          Table of Contents
        </div>
      </NuxtLink>
    </div>

    <div>
      <NuxtLink
        v-if="surroundingPosts[1]" class="btn btn-ghost w-full h-full"
        :to="`/posts/${surroundingPosts[1].slug}`"
      >
        <div class="py-2">
          <div class="text-xm font-light text-neutral-400 mb-3">
            Next in Series
          </div>
          {{ surroundingPosts[1].title }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
