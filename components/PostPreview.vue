<script setup lang="ts">
import type { Post } from '@/types'

const props = defineProps<{ post: Post }>()
const postPath = `/posts/${props.post.uuid}`
</script>

<template>
  <div class="flex items-center flex-col-reverse sm:flex-row gap-8">
    <div class="basis-8/12">
      <h2 class="text-2xl font-semibold mb-4">
        <NuxtLink :to="postPath">
          {{ post.title }}
        </NuxtLink>
      </h2>
      <p>
        {{ smartEllipsis(post.summary, 500) }}
      </p>
      <div class="mt-5">
        <NuxtLink :to="postPath" class="btn btn-neutral btn-wide btn-primary">
          Keep reading
        </NuxtLink>
      </div>
    </div>
    <div v-if="post.featuredImage" class="basis-4/12">
      <NuxtLink :to="postPath">
        <NuxtImg :src="post.featuredImage" height="300px" width="300px" class="rounded-md" />
      </NuxtLink>
    </div>
  </div>
</template>
