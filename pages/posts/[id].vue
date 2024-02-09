<script setup lang="ts">
import type { Post } from '~/types'

const route = useRoute()
const post = await usePost(route.params.id as string)
</script>

<template>
  <Container>
    <div class="my-10">
      <div class="text-5xl text-medium">
        {{ post.title }}
      </div>

      <div class="mt-10">
        <ContentRenderer :value="post" />
      </div>
    </div>
  </Container>
</template>
