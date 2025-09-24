<script setup lang="ts">
import type { Post } from '~~/types'
import { formatDate } from '~~/shared/utils'

const props = defineProps<{ post: Post }>()
const postPath = `/posts/${props.post.slug}`
</script>

<template>
  <StyledCard>
    <NuxtLink :to="postPath" class="rounded bg-neutral-800 grid grid-cols-5 h-full">
      <div class="aspect-16/9 overflow-hidden h-full w-full rounded-l col-span-2">
        <NuxtImg :src="post.featuredImage" class="w-full h-full object-cover" width="150px" placeholder />
      </div>

      <div class="flex flex-col h-full p-3 col-span-3">
        <div class="grow">
          {{ post.title }}
        </div>
        <div class="pt-3 justify-end">
          <div v-if="post.author" class="text-muted font-bold text-xs pt-2">
            by {{ post.author }}
          </div>
          <div class="pt-1">
            <div class="font-semibold text-xs text-neutral-500">
              {{ formatDate(post.createdDate) }}
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </StyledCard>
</template>
