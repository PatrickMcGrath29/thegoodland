<script setup lang="ts">
import type { Post } from '@/types'

const props = defineProps<{ post: Post, isFeatured?: boolean }>()
const postPath = `/posts/${props.post.slug}`
</script>

<template>
  <NuxtLink
    class="flex flex-col gap-6 bg-base-200 border border-base-300 hover:border-[#ffbf00] hover:border-opacity-20 rounded hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
    :to="postPath"
  >
    <div v-if="post.featuredImage" class="w-full relative">
      <div v-if="isFeatured" class="absolute top-4 left-4">
        <span
          class="bg-neutral-800 opacity-90 px-3 py-1.5 border border-neutral-700 shadow-lg text-neutral- flex items-center rounded-md"
        >
          <Icon name="mdi:star-four-points" class="mr-1.5 text-[#ffbf00]" />
          Featured
        </span>
      </div>
      <NuxtImg
        :src="post.featuredImage" width="500px" placeholder class="w-full h-72 object-cover rounded-t"
        :alt="`Featured image for ${post.title}`"
      />
    </div>
    <div class="px-6 pt-0 flex flex-col h-full mb-8">
      <h2 class="text-2xl font-semibold mb-4">
        {{ post.title }}
      </h2>
      <p v-if="post.summary">
        {{ smartEllipsis(post.summary, 220) }}
      </p>
      <div class="mt-5 flex-grow flex flex-col justify-end">
        <div class="font-bold text-xs text-neutral-500 mb-1 uppercase">
          {{ useFormattedDate(post.createdDate) }}
        </div>
        <div v-if="post.author" class="text-sm font-semibold ">
          by {{ post.author }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
