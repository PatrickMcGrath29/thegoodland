<script setup lang="ts">
import type { Post } from '~~/types'

const posts = await useBlogPosts(10)
const [latestPost, ...recentPosts] = posts

if (latestPost === undefined) {
  throw createError({ statusMessage: 'Posts Not Found', statusCode: 404 })
}

const description = 'The Good Land Blog is a collection of Biblical Christian resources that aim to highlight the richness of life found in Jesus Christ.'

const featuredPost = recentPosts[4] as Post
const featuredQuote = 'Shall we deprive ourselves of the blessedness we might enjoy by standing always in the presence of Christ, to hear His wisdom, and to behold His glory?'

useSeoMeta({
  description,
  ogDescription: description,
  ogImage: latestPost.featuredImage && useSeoImage(latestPost.featuredImage),
})
</script>

<template>
  <Container>
    <div class="px-2">
      <Hero :latest-post="latestPost" class="my-8" />

      <FeaturedQuotes />

      <SectionHeader heading="Blog Posts" subheading="See All" link="/posts" />
      <FeaturedPost :post="featuredPost" :featured-quote="featuredQuote" />

      <div class="my-8 gap-5">
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
