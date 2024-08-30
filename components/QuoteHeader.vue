<script setup lang="ts">
defineProps<{ heading: string }>()
</script>

<template>
  <h1 class="my-14 flex items-center">
    <span class="text-2xl border-r pr-4 border-neutral-500 font-light text-neutral-500">Quotes</span>
    <span class="text-4xl pl-4 font-bold">{{ heading }}</span>
  </h1>
</template>
