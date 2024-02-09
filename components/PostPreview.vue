<script setup lang="ts">
import type { PostPreview } from '@/types'

const props = defineProps<{ post: Post }>()
const postPath = `/posts/${props.post.uuid}`
</script>

<template>
  <div class="flex justify-center">
    <div class="flex gap-8 max-w-5xl">
      <div class="basis-8/12">
        <h2 class="text-2xl font-semibold mb-4">
          {{ post.title }}
        </h2>
        <p>
          {{ post.summary }}
        </p>
        <div class="mt-5">
          <NuxtLink :to="postPath" class="btn btn-wide btn-primary">
            Keep reading
          </NuxtLink>
        </div>
      </div>
      <div class="basis-4/12">
        <NuxtLink :to="postPath">
          <img :src="post.featured_image" class="rounded-md">
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
