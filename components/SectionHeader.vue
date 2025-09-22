<script setup lang="ts">
defineProps<{
  heading: string
  subheading: string
  link: string
}>()
</script>

<template>
  <h2 class="text-3xl font-semibold mb-2">
    {{ heading }}
  </h2>

  <div class="mb-12">
    <NuxtLink
      class="text-md flex items-center w-fit hover:text-accent transition-all font-semibold hover:gap-1"
      :to="link"
    >
      {{ subheading }}
      <Icon name="mdi:chevron-right" class="text-accent size-5" />
    </NuxtLink>
  </div>
</template>
