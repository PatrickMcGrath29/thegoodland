<script setup lang="ts">
import PostDetail from '~/components/PostDetail.vue'
import type { Post } from '~/types'

const { params: { id: postId } } = useRoute()
const { public: { baseUrl } } = useRuntimeConfig()
const img = useImage()

const postData = await useAsyncData(`post/${postId}}`, () => usePost(postId as string))

const post = postData.data as Ref<Post>
const postCreatedDate = computed(() => {
  return new Date(post.value.createdDate).toLocaleDateString()
})

const postSeoDescripton = computed(() => {
  return smartEllipsis(post.value.summary, 160)
})

function postSeoImage() {
  if (!post.value.featuredImage)
    return null

  const formattedImagePath = img(
    post.value.featuredImage,
    { width: 1200, height: 630 },
  )

  return new URL(formattedImagePath, baseUrl).toString()
}

useSeoMeta({
  title: post.value.title,
  ogTitle: post.value.tile,
  description: postSeoDescripton,
  ogDescription: postSeoDescripton,
  ogImage: postSeoImage(),
})
</script>

<template>
  <article>
    <Container>
      <div v-if="post.featuredImage" class="my-5">
        <NuxtImg :src="post.featuredImage" height="1000px" class="w-full h-96 object-cover rounded-lg" />
      </div>
    </Container>
    <ContainerSmall>
      <div class="my-10 mx-2">
        <h1 class="text-4xl font-semibold">
          {{ post.title }}
        </h1>
        <div v-if="post.author || post.createdDate" class="mt-2 flex gap-5">
          <PostDetail v-if="post.author" icon-name="mdi:account" :text="post.author" />
          <PostDetail v-if="post.createdDate" icon-name="mdi:calendar" :text="postCreatedDate" />
        </div>

        <div class="mt-10 text-lg">
          <ContentRenderer :value="post" />
        </div>
      </div>
    </ContainerSmall>
  </article>
</template>
