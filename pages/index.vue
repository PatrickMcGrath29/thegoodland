<script setup lang="ts">
import type { Post } from '~/types'

const postData = await useAsyncData('6-recent-posts', () => usePosts(6))

const posts = postData.data as Ref<Post[]>
const [featuredPost, ...recentPosts] = posts.value

useSeoMeta({
  ogImage: useSeoImage(featuredPost.featuredImage),
})
</script>

<template>
  <Container>
    <Hero :featured-post="featuredPost" class="mt-6" />
  </Container>
  <ContainerMedium>
    <div class="my-12 mx-2 gap-5">
      <h2 class="text-4xl font-semibold mb-12 text-center">
        Recent Posts
      </h2>
      <div class="flex gap-8 md:gap-12 flex-col">
        <PostPreview v-for="post in recentPosts" :key="post.slug" :post="post" />
      </div>
    </div>
  </ContainerMedium>
</template>
