<script setup lang="ts">
import type { Post } from '~/types'

const { params: { id: postId } } = useRoute()
const postData = await useAsyncData(`post/${postId}}`, () => usePost(postId as string))

const post = postData.data as Ref<Post>
const postCreatedDate = new Date(post.value.createdDate).toLocaleDateString()
</script>

<template>
  <Container>
    <div class="my-5">
      <NuxtImg :src="post.featuredImage" height="1000px" class="w-full h-96 object-cover rounded-lg" />
    </div>
  </Container>
  <ContainerSmall>
    <div class="my-10 mx-2">
      <div class="text-4xl font-semibold">
        {{ post.title }}
      </div>
      <div v-if="post.author" class="mt-2 flex gap-5">
        <PostDetail icon-name="mdi:account" :text="post.author" />
        <PostDetail icon-name="mdi:calendar" :text="postCreatedDate" />
      </div>

      <div class="mt-10 text-lg">
        <ContentRenderer :value="post" />
      </div>
    </div>
  </ContainerSmall>
</template>
