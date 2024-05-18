<script setup lang="ts">
import type { Collection, Post } from '~/types'

const props = defineProps<{ collection: Collection, post: Post }>()

const { data: surroundingPosts } = useAsyncData(async () => {
  const idx = props.collection.posts.indexOf(props.post.slug)

  const prevPostSlug = idx === 0 ? null : props.collection.posts[idx - 1]
  const nextPostSlug = idx === props.collection.posts.length - 1 ? null : props.collection.posts[idx + 1]

  const [prev, next] = await Promise.all([
    prevPostSlug ? usePost(prevPostSlug) : null,
    nextPostSlug ? usePost(nextPostSlug) : null,
  ])

  return {
    prev,
    next,
  }
})
</script>

<template>
  <div class="flex justify-between mt-10 md:px-10 flex-col sm:flex-row items-center">
    <div>
      <NuxtLink v-if="surroundingPosts?.prev" class="btn btn-ghost" :to="`/posts/${surroundingPosts.prev.slug}`">
        <Icon name="mdi:arrow-left" />
        {{ surroundingPosts.prev.title }}
      </NuxtLink>
    </div>
    <div>
      <NuxtLink v-if="surroundingPosts?.next" class="btn btn-ghost" :to="`/posts/${surroundingPosts.next.slug}`">
        {{ surroundingPosts.next.title }}
        <Icon name="mdi:arrow-right" />
      </NuxtLink>
    </div>
  </div>
</template>
