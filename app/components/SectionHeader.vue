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
    <NuxtLink class="text-md flex items-center w-fit hover:text-accent transition-all font-semibold" :to="link">
      {{ subheading }}
      <Icon name="ph:arrow-right-bold" size="15px" class="text-accent ml-1.5" />
    </NuxtLink>
  </div>
</template>
