<script setup lang="ts">
const route = useRoute()
const post = await usePost(route.params.id as string)
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
