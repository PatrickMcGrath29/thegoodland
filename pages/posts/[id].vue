<script setup lang="ts">
import type { Post } from '~/types'
import PostDetail from '~/components/PostDetail.vue'

const { params: { id: slug } } = useRoute()

const postData = await useAsyncData(`post/${slug}}`, () => usePost(slug as string))
const post = postData.data as Ref<Post>

const { data: collectionData } = await useAsyncData(`posts/collectionData/${slug}`, () => useCollectionInfoForPost(post.value.slug))

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
    return `${post.value.title} by ${post.value.author}`

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
    datePublished: post.value.createdDate.toISOString(),
    image: post.value.featuredImage,
    author: post.value.author && {
      name: post.value.author,
    },
  }),
])

const postElementRef = ref<HTMLElement>()
</script>

<template>
  <article>
    <Container>
      <div v-if="post.featuredImage || collectionData?.featuredImage" class="my-5">
        <NuxtImg
          :src="post.featuredImage || collectionData?.featuredImage" height="1000px"
          class="w-full h-96 object-cover rounded-lg" :alt="`Featured image for ${post.title}`" placeholder
        />
      </div>
    </Container>

    <ContainerMedium>
      <div class="my-10 px-2">
        <div class="max-w-screen-md m-auto">
          <h1 class="text-4xl font-semibold">
            {{ post.title }}
          </h1>
          <div v-if="post.author || post.createdDate" class="mt-3 flex gap-x-5 gap-y-2 flex-wrap">
            <PostDetail v-if="post.author" icon-name="ph:user-duotone" :text="post.author" />
            <PostDetail
              v-if="post.isBlogPost && post.createdDate" icon-name="ph:calendar-blank-duotone"
              :text="postCreatedDate"
            />
            <PostDetail v-if="collectionData" icon-name="ph:book-bookmark-duotone" :text="collectionData.name" :to="`/collections/${collectionData.slug}`" />
          </div>
        </div>

        <div ref="postElementRef" class="mt-10 text-lg">
          <RefTagger>
            <ContentRenderer
              :value="post"
              class="[&>*]:max-w-screen-md [&>*]:mx-auto [&>section]:mt-10 [&_a.rtBibleRef]:underline [&_a.rtBibleRef]:decoration-1 [&_a.rtBibleRef]:underline-offset-2"
            />
          </RefTagger>
        </div>
        <CollectionNavigation v-if="collectionData" :collection="collectionData" :post="post" />
      </div>
    </ContainerMedium>
  </article>
</template>

<style>
svg {
  display: inline !important;
}
</style>
