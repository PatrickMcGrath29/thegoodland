<script setup lang="ts">
const { data: posts } = await useAsyncData('useBlogPosts', () => useBlogPosts())

const description = 'Literature that highlights the richness of life found in Jesus Christ.'

useSeoMeta({
  title: 'The Good Land Blog',
  description,
  ogDescription: description,
})

const highlightedPostSlugs = [
  '2023-06-07-lord-make-me-a-man-after-thine-own-heart',
]

const highlightedPosts = computed(() => {
  if (!posts.value)
    return []

  return posts.value.filter(p => highlightedPostSlugs.includes(p.slug))
})
</script>

<template>
  <Container>
    <PageHeader heading="Instagram Posts" :subheading="description" />

    <VerticalPostPreview v-for="post in highlightedPosts" :key="post.slug" :post="post" />
  </Container>
</template>
