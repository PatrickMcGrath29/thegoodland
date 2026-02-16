<script setup lang="ts">
import type { Post } from '~~/types'
import { formatDate, slugify, smartEllipsis } from '~~/shared/utils'
import PostDetail from '~/components/PostDetail.vue'

const { params: { id: slug } } = useRoute()
const { data: postData, error } = await useAsyncData(`post/${slug}`, () => usePost(slug as string))

if (error.value) {
  throw createError({ statusMessage: 'Post Not Found', statusCode: 404 })
}

const post = postData as Ref<Post>

const { data: collections } = await useAsyncData(`posts/collection-data/${slug}`, () => useCollectionInfoForPost(post.value.slug))
const primaryCollection = computed(() => {
  if (collections.value && collections.value.length > 0)
    return collections.value[0]

  return undefined
})

const postCreatedDate = computed(() => {
  return formatDate(post.value.createdDate)
})

const postSeoDescripton = computed(() => {
  if (!post.value.summary)
    return ''

  return smartEllipsis(post.value.summary, 160)
})

const title = computed(() => {
  if (post.value.author)
    return `${post.value.title}, by ${post.value.author}`

  return post.value.title
})

useSeoMeta({
  title,
  ogTitle: title,
  description: postSeoDescripton,
  ogDescription: postSeoDescripton,
  ogImage: post.value.featuredImage && useSeoImage(post.value.featuredImage),
})

useSchemaOrg([
  defineArticle({
    headline: title,
    description: postSeoDescripton,
    datePublished: post.value.createdDate.toISOString(),
    image: post.value.featuredImage,
    ...(post.value.author && {
      author: {
        '@type': 'Person',
        'name': post.value.author,
      },
    }),
  }),
])

const postLinks = computed(() => {
  const links = post.value.body?.toc?.links

  if (!links)
    return []

  return [{
    text: post.value.title,
    id: slugify(post.value.title),
    depth: 0,
  }, ...links]
})

const postElementRef = ref<HTMLElement>()
</script>

<template>
  <article>
    <Container>
      <div v-if="post.featuredImage || primaryCollection?.featuredImage" class="my-5">
        <NuxtImg
          :src="post.featuredImage || primaryCollection?.featuredImage" height="1000px"
          class="w-full h-96 object-cover rounded-lg" :alt="`Featured image for ${post.title}`" placeholder
        />
      </div>
    </Container>

    <!-- Main content area with TOC -->
    <Container>
      <div class="xl:grid xl:grid-cols-[200px_minmax(0,1fr)_200px] xl:gap-8">
        <aside v-if="postLinks.length > 0">
          <UContentToc :links="postLinks">
            <template #bottom />
          </UContentToc>
        </aside>

        <!-- Main Blog Content - Centered -->
        <div class="w-full mx-auto px-4">
          <div class="my-10 px-2">
            <div>
              <h1 :id="slugify(post.title)" class="text-4xl font-semibold">
                {{ post.title }}
              </h1>
              <div v-if="post.author || post.createdDate" class="mt-3 flex gap-x-5 gap-y-2 flex-wrap">
                <PostDetail v-if="post.author" icon-name="ph:user-duotone" :text="post.author" />
                <PostDetail
                  v-if="post.isBlogPost && post.createdDate" icon-name="ph:calendar-blank-duotone"
                  :text="postCreatedDate"
                />
                <PostDetail
                  v-if="primaryCollection" icon-name="ph:book-bookmark-duotone" :text="primaryCollection.name"
                  :to="`/collections/${primaryCollection.slug}`"
                />
              </div>
            </div>

            <div ref="postElementRef" class="mt-10 text-lg">
              <RefTagger>
                <ContentRenderer
                  :value="post"
                  class="[&>section]:mt-10 [&_a.rtBibleRef]:underline [&_a.rtBibleRef]:decoration-1 [&_a.rtBibleRef]:underline-offset-2"
                />
              </RefTagger>
            </div>
            <CollectionNavigation v-if="primaryCollection" :collection="primaryCollection" :post="post" />
          </div>
        </div>
      </div>
    </Container>
  </article>
</template>

<style>
svg {
  display: inline !important;
}
</style>
