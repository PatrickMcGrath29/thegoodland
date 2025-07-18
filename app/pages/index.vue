<script setup lang="ts">
import type { Post } from '~~/types'

const postData = await useAsyncData('homePostSample', () => useBlogPosts(10))

const posts = postData.data as Ref<Post[]>
const [featuredPost, ...recentPosts] = posts.value

const description = 'The Good Land Blog is a collection of Biblical Christian resources that aim to highlight the richness of life found in Jesus Christ.'

useSeoMeta({
  description,
  ogDescription: description,
  ogImage: featuredPost.featuredImage && useSeoImage(featuredPost.featuredImage),
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

        <div class="mb-12">
          <NuxtLink
            class="text-md flex items-center w-fit hover:text-accent transition-all font-semibold hover:gap-1"
            to="/posts"
          >
            See All
            <Icon name="mdi:chevron-right" class="text-accent size-5" />
          </NuxtLink>
        </div>

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
