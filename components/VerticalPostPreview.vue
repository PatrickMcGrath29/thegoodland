<script setup lang="ts">
import type { Post } from '@/types'
import { formatDate, smartEllipsis } from '~/shared/utils'

const props = defineProps<{ post: Post, isFeatured?: boolean }>()
const postPath = `/posts/${props.post.slug}`
</script>

<template>
  <StyledCard>
    <NuxtLink :to="postPath" class="flex flex-col gap-6 h-full" prefetch-on="interaction">
      <div v-if="post.featuredImage" class="w-full relative">
        <div v-if="isFeatured" class="absolute top-4 left-4">
          <span
            class="bg-neutral-800 opacity-90 px-3 py-1.5 border border-neutral-700 shadow-lg flex items-center rounded-md"
          >
            <Icon name="mdi:star-four-points" class="mr-1.5 text-accent" />
            Featured
          </span>
        </div>
        <NuxtImg
          :src="post.featuredImage" width="400px" placeholder class="w-full h-72 object-cover rounded-t"
          :alt="`Preview image for ${post.title}`"
        />
      </div>
      <div class="px-6 pt-0 flex flex-col h-full mb-8">
        <h2 class="text-2xl font-semibold mb-4">
          {{ post.title }}
        </h2>
        <p v-if="post.summary">
          {{ smartEllipsis(post.summary, 230) }}
        </p>
        <div class="mt-5 flex-grow flex flex-col justify-end">
          <div v-if="post.author" class="text-sm font-bold mb-1">
            by {{ post.author }}
          </div>
          <div class="font-bold text-xs text-neutral-500 uppercase">
            {{ formatDate(post.createdDate) }}
          </div>
        </div>
      </div>
    </NuxtLink>
  </StyledCard>
</template>
