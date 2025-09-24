<script setup lang="ts">
const posts = await useBlogPosts(10)

const [featuredPost, ...recentPosts] = posts

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

      <FeaturedQuotes />

      <div class="my-8 gap-5 ">
        <SectionHeader heading="Recent Posts" subheading="See All" link="/posts" />

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
          <VerticalPostPreview v-for="post in recentPosts" :key="post.slug" :post="post" />
        </div>
        <div class="text-center mt-10">
          <UButton to="/posts" variant="outline" size="lg" color="neutral">
            View All Posts
          </UButton>
        </div>
      </div>
    </div>
  </Container>
</template>
