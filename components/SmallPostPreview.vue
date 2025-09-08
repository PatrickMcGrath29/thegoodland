<script setup lang="ts">
import type { Post } from '~/types'
import { formatDate } from '~/shared/utils'

const props = defineProps<{ post: Post }>()
const postPath = `/posts/${props.post.slug}`
</script>

<template>
  <NuxtLink :to="postPath" class="rounded-md bg-neutral-800 p-3">
    <div class="flex flex-col h-full">
      <div class="grow">
        {{ post.title }}
      </div>
      <div class="pt-2 justify-end">
        <div v-if="post.author" class="text-muted text-sm pt-2">
          by {{ post.author }}
        </div>
        <div class="pt-2">
          <div class="font-bold text-xs text-neutral-500 uppercase">
            {{ formatDate(post.createdDate) }}
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
