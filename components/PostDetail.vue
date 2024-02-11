<script setup lang="ts">
defineProps<{
  iconName: string
  text: string
}>()
</script>

<template>
  <div class="flex items-center">
    <Icon :name="iconName" class="pr-1.5" size="25px" />
    {{ text }}
  </div>
</template>
