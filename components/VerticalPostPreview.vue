<script setup lang="ts">
import type { Post } from '@/types'

const props = defineProps<{ post: Post, isFeatured?: boolean }>()
const postPath = `/posts/${props.post.slug}`
</script>

<template>
  <div class="flex flex-col gap-6 bg-base-200 border border-base-300 rounded">
    <div v-if="post.featuredImage" class="w-full relative">
      <NuxtLink :to="postPath">
        <div v-if="isFeatured" class="absolute top-4 left-4">
          <span
            class="bg-neutral-800 opacity-90 px-3 py-1.5 border border-neutral-700 shadow-lg text-neutral-400 flex items-center rounded-md"
          >
            <Icon name="mdi:star-four-points-outline" class="mr-1.5" />
            Featured
          </span>
        </div>
        <NuxtImg :src="post.featuredImage" width="500px" placeholder class="w-full h-72 object-cover rounded-t" />
      </NuxtLink>
    </div>
    <div class="px-6 pt-0 flex flex-col h-full">
      <h2 class="text-2xl font-semibold mb-4">
        <NuxtLink :to="postPath">
          {{ post.title }}
        </NuxtLink>
      </h2>
      <div v-if="post.author" class="mb-3 text-sm font-semibold text-neutral-500">
        by {{ post.author }}
      </div>
      <p v-if="post.summary">
        {{ smartEllipsis(post.summary, 220) }}
      </p>
    </div>
    <div class="p-5 pt-0 flex-end text-center">
      <NuxtLink :to="postPath" class="btn btn-ghost btn-block btn-primary">
        Keep reading
        <Icon name="mdi:arrow-right" class="ml-1" />
      </NuxtLink>
    </div>
  </div>
</template>
