<script setup lang="ts">
defineProps<{
  iconName: string
  text: string
}>()
</script>

<template>
  <div class="flex items-center text-neutral-500 gap-1">
    <Icon :name="iconName" class="pr-1.5 bg-accent opacity-50" size="20px" />
    {{ text }}
  </div>
</template>
