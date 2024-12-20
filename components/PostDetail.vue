<script setup lang="ts">
defineProps<{
  iconName: string
  text: string
  to?: string
}>()
</script>

<template>
  <NuxtLink class="flex items-center text-neutral-500 gap-1" :to="to || ''" :disabled="!to">
    <Icon :name="iconName" class="pr-1.5 bg-accent opacity-50" size="20px" />
    {{ text }}
  </NuxtLink>
</template>
