<script setup lang="ts">
const posts = await usePostPreviews()
</script>

<template>
  <Container>
    <Hero />
    <div class="mt-10 gap-5">
      <h2 class="text-3xl font-medium mb-5 text-center">
        Recent Posts
      </h2>
      <Post v-for="post in posts" :key="post.slug" :post="post" />
    </div>
  </Container>
</template>
