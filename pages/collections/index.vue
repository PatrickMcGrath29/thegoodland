<script setup lang="ts">
const { data: collections } = await useAsyncData('allCollections', () => useCollections())
</script>

<template>
  <Container>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 my-10">
      <NuxtLink v-for="(collection, idx) in collections" :key="idx" :to="`/collections/${collection.slug}`">
        <StyledCard>
          <NuxtImg
            v-if="collection.featuredImage" :src="collection.featuredImage" height="250px" placeholder
            class="object-cover w-full h-56 rounded-t"
          />
          <div class="m-8 block">
            <div class="text-3xl font-medium">
              {{ collection.name }}
            </div>
            <div class="mt-1 text-neutral-500">
              by {{ collection.author }}
            </div>
          </div>
        </StyledCard>
      </NuxtLink>
    </div>
  </Container>
</template>
