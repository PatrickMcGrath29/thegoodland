<script setup lang="ts">
const { withBreadCrumbs = false, heading } = defineProps<{ heading: string, withBreadCrumbs?: boolean }>()
</script>

<template>
  <h1 class="flex items-center flex-col md:flex-row" :class="{ 'my-10 md:my-14': !withBreadCrumbs, 'mb-10 md:mb-14': withBreadCrumbs }">
    <NuxtLink
      to="/quotes"
      class="text-2xl border-neutral-500 font-light text-neutral-500 border-b md:border-r md:border-b-0 pb-1 md:pr-4 md:pb-0"
    >
      Quotes
    </NuxtLink>
    <span class="text-4xl pt-1 md:pl-4 md:pt-0 font-bold text-center md:text-left">{{ heading }}</span>
  </h1>
</template>
