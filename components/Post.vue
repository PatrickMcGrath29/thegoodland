<script setup lang="ts">
import type { PostPreview } from '@/types'

defineProps<{ post: PostPreview }>()
</script>

<template>
  <div class="p-6 flex">
    <div class="w-[70%]">
      <h2 class="text-2xl font-bold mb-4">
        {{ post.title }}
      </h2>
      <p class="">
        {{ post.summary }}
      </p>
      <div class="mt-5">
        <NuxtLink :to="`/post/${post.uuid}`" class="btn btn-wide btn-primary">
          Keep reading
        </NuxtLink>
      </div>
    </div>
    <div class="w-[30%]">
      <img :src="post.featured_image" class="max-h-52">
    </div>
  </div>
</template>
