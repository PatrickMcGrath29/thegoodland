<script setup lang="ts">
import type { Post } from '~/types'

const { params: { id: postId } } = useRoute()
const postData = await useAsyncData(`post/${postId}}`, () => usePost(postId as string))

const post = postData.data as Ref<Post>
</script>

<template>
  <ContainerSmall>
    <div class="my-10">
      <div class="text-4xl font-semibold">
        {{ post.title }}
      </div>

      <div class="mt-10 text-lg">
        <ContentRenderer :value="post" />
      </div>
    </div>
  </ContainerSmall>
</template>
