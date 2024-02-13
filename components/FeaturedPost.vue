<script setup lang="ts">
import type { Post } from '@/types'

const props = defineProps<{ post: Post }>()
const postPath = `/posts/${props.post.uuid}`
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="w-full">
      <NuxtLink :to="postPath">
        <NuxtImg :src="post.featuredImage" width="500px" class="w-full h-72 rounded-md" />
      </NuxtLink>
    </div>
    <div class="">
      <h2 class="text-2xl font-semibold mb-4">
        <NuxtLink :to="postPath">
          {{ post.title }}
        </NuxtLink>
      </h2>
      <p>
        {{ post.summary }}
      </p>
      <div class="mt-5">
        <NuxtLink :to="postPath" class="btn btn-neutral btn-wide btn-primary">
          Keep reading
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
