<script setup lang="ts">
const { data: posts } = await useAsyncData('useBlogPosts', () => useBlogPosts())

const description = 'Blog posts that highlight the richness of life found in Jesus Christ.'

useSeoMeta({
  title: 'The Good Land Blog — Posts',
  description,
  ogDescription: description,
})
</script>

<template>
  <Container>
    <PageHeader heading="All Blog Posts" subtitle="Blog" />

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12 my-10 px-2">
      <VerticalPostPreview v-for="post in posts" :key="post.slug" :post="post" />
    </div>
  </Container>
</template>
