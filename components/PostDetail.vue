<script setup lang="ts">
defineProps<{
  iconName: string
  text: string
}>()
</script>

<template>
  <div class="flex items-center text-neutral-500">
    <Icon :name="iconName" class="pr-1.5" size="25px" />
    {{ text }}
  </div>
</template>
