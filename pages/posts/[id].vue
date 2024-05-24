<script setup lang="ts">
import PostDetail from '~/components/PostDetail.vue'
import type { Post } from '~/types'

const { params: { id: slug } } = useRoute()

const postData = await useAsyncData(`post/${slug}}`, () => usePost(slug as string))
const post = postData.data as Ref<Post>

const { data: collectionData } = await useAsyncData(`collectionData/${slug}`, () => useCollectionInfoForPost(post.value.slug))

const postCreatedDate = computed(() => {
  return useFormattedDate(post.value.createdDate)
})

const postSeoDescripton = computed(() => {
  if (!post.value.summary)
    return ''

  return smartEllipsis(post.value.summary, 160)
})

useSeoMeta({
  title: post.value.title,
  ogTitle: post.value.tile,
  description: postSeoDescripton,
  ogDescription: postSeoDescripton,
  ogImage: useSeoImage(post.value.featuredImage),
})

const postElementRef = ref<HTMLElement>()
</script>

<template>
  <article>
    <Container>
      <div v-if="post.featuredImage" class="my-5">
        <NuxtImg :src="post.featuredImage" height="1000px" class="w-full h-96 object-cover rounded-lg" />
      </div>
    </Container>
    <ContainerMedium>
      <div class="my-10 px-2">
        <div class="max-w-screen-md m-auto">
          <h1 class="text-4xl font-semibold">
            {{ post.title }}
          </h1>
          <div v-if="post.author || post.createdDate" class="mt-2 flex gap-x-5 gap-y-2 flex-wrap">
            <PostDetail v-if="post.author" icon-name="mdi:account" :text="post.author" />
            <PostDetail v-if="post.isBlogPost && post.createdDate" icon-name="mdi:calendar" :text="postCreatedDate" />
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
