<script setup lang="ts">
import PostDetail from '~/components/PostDetail.vue'
import type { Post } from '~/types'

const { params: { id: slug } } = useRoute()

const postData = await useAsyncData(`post/${slug}}`, () => usePost(slug as string))

const post = postData.data as Ref<Post>
const postCreatedDate = computed(() => {
  return post.value.createdDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
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
</script>

<template>
  <article>
    <Container>
      <div v-if="post.featuredImage" class="my-5">
        <NuxtImg :src="post.featuredImage" height="1000px" class="w-full h-96 object-cover rounded-lg" />
      </div>
    </Container>
    <ContainerMedium>
      <div class="my-10">
        <div class="max-w-screen-md m-auto">
          <h1 class="text-4xl font-semibold">
            {{ post.title }}
          </h1>
          <div v-if="post.author || post.createdDate" class="mt-2 flex gap-x-5 gap-y-2 flex-wrap">
            <PostDetail v-if="post.author" icon-name="mdi:account" :text="post.author" />
            <PostDetail v-if="post.createdDate" icon-name="mdi:calendar" :text="postCreatedDate" />
          </div>
        </div>

        <div class="mt-10 text-lg">
          <ContentRenderer :value="post" class="[&>*]:max-w-screen-md [&>*]:mx-auto" />
        </div>
      </div>
    </ContainerMedium>
  </article>
</template>
