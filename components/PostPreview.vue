<script setup lang="ts">
import type { Post } from '@/types'

const props = defineProps<{ post: Post }>()
const postPath = `/posts/${props.post.slug}`
</script>

<template>
  <div class="flex items-center flex-col-reverse sm:flex-row gap-8 card bg-base-200 p-4 md:p-8">
    <div class="basis-8/12">
      <h2 class="text-2xl font-semibold mb-4">
        <NuxtLink :to="postPath">
          {{ post.title }}
        </NuxtLink>
      </h2>
      <p v-if="post.summary">
        {{ smartEllipsis(post.summary, 220) }}
      </p>
      <div class="mt-5">
        <NuxtLink :to="postPath" class="btn btn-neutral btn-wide btn-primary">
          Keep reading
        </NuxtLink>
      </div>
    </div>
    <div v-if="post.featuredImage" class="basis-4/12">
      <NuxtLink :to="postPath">
        <NuxtImg :src="post.featuredImage" height="300px" width="300px" placeholder class="rounded-md" />
      </NuxtLink>
    </div>
  </div>
</template>
