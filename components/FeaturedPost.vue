<script setup lang="ts">
import type { Post } from '@/types'

const props = defineProps<{ post: Post }>()
const postPath = `/posts/${props.post.path}`
</script>

<template>
  <div class="flex flex-col gap-8">
    <div v-if="post.featuredImage" class="w-full relative">
      <NuxtLink :to="postPath">
        <div class="absolute top-4 left-4">
          <span class="bg-neutral-800 opacity-90 px-3 py-1.5 border border-neutral-700 shadow-lg text-neutral-400 flex items-center rounded-md">
            <Icon
              name="mdi:star-four-points-outline"
              class="mr-1.5"
            />
            Featured
          </span>
        </div>
        <NuxtImg :src="post.featuredImage" width="500px" placeholder class="w-full h-72 rounded-md object-cover" />
      </NuxtLink>
    </div>
    <div class="">
      <h2 class="text-2xl font-semibold mb-4">
        <NuxtLink :to="postPath">
          {{ post.title }}
        </NuxtLink>
      </h2>
      <p v-if="post.summary">
        {{ smartEllipsis(post.summary, 500) }}
      </p>
      <div class="mt-5">
        <NuxtLink :to="postPath" class="btn btn-neutral btn-wide btn-primary">
          Keep reading
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
