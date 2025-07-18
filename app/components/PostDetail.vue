<script setup lang="ts">
defineProps<{
  iconName: string
  text: string
  to?: string
}>()
</script>

<template>
  <template v-if="to">
    <NuxtLink class="flex items-center text-neutral-500 gap-1 hover:underline" :to="to">
      <UIcon :name="iconName" class="pr-1.5 !bg-accent opacity-50" size="20px" />
      {{ text }}
    </NuxtLink>
  </template>
  <template v-else>
    <div class="flex items-center text-neutral-500 gap-1">
      <Icon :name="iconName" class="pr-1.5 !bg-accent opacity-50" size="20px" />
      {{ text }}
    </div>
  </template>
</template>
