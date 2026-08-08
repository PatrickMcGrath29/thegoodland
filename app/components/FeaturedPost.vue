<script setup lang="ts">
import type { Post } from '~~/types'

defineProps <{ post: Post, featuredQuote: string }>()
</script>

<template>
  <section class="mb-16">
    <NuxtLink :to="post.path">
      <StyledCard>
        <div class="flex flex-col lg:flex-row bg-neutral-800/90 items-center">
          <div class="basis-9/20">
            <NuxtImg
              :src="post.featuredImage" width="400px" placeholder class="w-full h-80 object-cover rounded-l"
              :alt="`Preview image for ${post.title}`" loading="lazy"
            />
          </div>
          <div class="basis-11/20 mb-6 mx-6">
            <div class="flex mb-5">
              <span
                class="py-1.5 flex items-center"
              >
                <Icon name="mdi:star-four-points" class="mr-1.5 text-accent" />
                Featured
              </span>
            </div>
            <div class="text-2xl font-semibold">
              {{ post.title }}
            </div>
            <div class="text-sm font-bold text-muted">
              by {{ post.author }}
            </div>
            <div class="mt-10 text-xl italic text-toned">
              "{{ featuredQuote }}"
            </div>
          </div>
        </div>
      </StyledCard>
    </NuxtLink>
  </section>
</template>
