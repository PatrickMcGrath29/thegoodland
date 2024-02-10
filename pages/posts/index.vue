<script setup lang="ts">
const { data: posts } = await useAsyncData('all-posts', () => usePosts())
</script>

<template>
  <ContainerMedium>
    <div class="mt-10">
      <h1 class="text-4xl font-semibold text-center">
        All Posts
      </h1>
    </div>
    <div class="mt-20">
      <PostPreview v-for="post in posts" :key="post.slug" :post="post" />
    </div>
  </ContainerMedium>
</template>
