<script setup lang="ts">
import type { Post } from '~/types'

const postData = await useAsyncData('all-posts', () => usePosts(6))

const posts = postData.data as Ref<Post[]>
const [featuredPost, ...recentPosts] = posts.value
</script>

<template>
  <Container>
    <Hero :featured-post="featuredPost" />
    <div class="divider mt-10" />
  </Container>
  <ContainerMedium>
    <div class="my-10 gap-5">
      <h2 class="text-4xl font-bold mb-14 text-center">
        Recent Posts
      </h2>
      <div class="flex gap-24 flex-col">
        <PostPreview v-for="post in recentPosts" :key="post.slug" :post="post" />
      </div>
    </div>
  </ContainerMedium>
</template>
