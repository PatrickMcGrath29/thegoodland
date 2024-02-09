<script setup lang="ts">
import type { PostPreview } from '@/types'

defineProps<{ post: Post }>()
</script>

<template>
  <div class="flex justify-center">
    <div class="flex gap-8 max-w-6xl">
      <div class="basis-8/12">
        <h2 class="text-2xl font-bold mb-4">
          {{ post.title }}
        </h2>
        <p class="">
          {{ post.summary }}
        </p>
        <div class="mt-5">
          <NuxtLink :to="`/posts/${post.uuid}`" class="btn btn-wide btn-primary">
            Keep reading
          </NuxtLink>
        </div>
      </div>
      <div class="">
        <img :src="post.featured_image" class="max-h-52 rounded-md">
      </div>
    </div>
  </div>
</template>
