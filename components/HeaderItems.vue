<script setup lang="ts">
const { data: collections } = await useAsyncData('collections', () => useCollections())

const collectionsItems = computed(() => collections.value?.map(collection => ({
  label: collection.name,
  to: `/collections/${collection.slug}`,
})))
</script>

<template>
  <li>
    <UButton to="/posts" color="neutral" variant="ghost" class="hover:bg-neutral-600">
      Blog Posts
    </UButton>
  </li>
  <li>
    <UDropdownMenu
      :items="collectionsItems" :ui="{
        content: 'w-48',
      }"
    >
      <UButton label="Collections" color="neutral" variant="ghost" class="cursor-pointer hover:bg-neutral-600" />
    </UDropdownMenu>
  </li>
  <li>
    <UButton to="/quotes" color="neutral" variant="ghost" class="hover:bg-neutral-600">
      Quotes
    </UButton>
  </li>
</template>
