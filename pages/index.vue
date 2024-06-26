<script setup lang="ts">
import type { Post } from '~/types'

const postData = await useAsyncData('homePostSample', () => useBlogPosts(10))

const posts = postData.data as Ref<Post[]>
const [featuredPost, ...recentPosts] = posts.value

useSeoMeta({
  ogImage: useSeoImage(featuredPost.featuredImage),
})
</script>

<template>
  <Container>
    <div class="px-2">
      <Hero :featured-post="featuredPost" class="my-8" />
      <div class="my-8 gap-5 ">
        <h2 class="text-4xl font-semibold mb-2">
          Recent Posts
        </h2>

        <NuxtLink class="text-md mb-12 flex items-center text-neutral-400 hover:text-[#ffbf00] transition-all font-medium gap-1 hover:gap-1.5" to="/posts">
          See All
          <Icon name="mdi:chevron-right" class="text-[#ffbf00] size-6" />
        </NuxtLink>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
          <VerticalPostPreview v-for="post in recentPosts" :key="post.slug" :post="post" />
        </div>
        <div class="text-center mt-10">
          <NuxtLink to="/posts" class="btn btn-wide btn-outline">
            View All Posts
          </NuxtLink>
        </div>
      </div>
    </div>
  </Container>
</template>
