<script setup lang="ts">
const { data: posts } = await useAsyncData('all-posts', () => usePosts())
</script>

<template>
  <Container>
    <Hero />
  </Container>

  <ContainerMedium>
    <div class="my-10 gap-5">
      <h2 class="text-3xl font-bold mb-10 text-center">
        Recent Posts
      </h2>
      <div class="flex gap-16 flex-col">
        <PostPreview v-for="post in posts" :key="post.slug" :post="post" />
      </div>
    </div>
  </ContainerMedium>
</template>
