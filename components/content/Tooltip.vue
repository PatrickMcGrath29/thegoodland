<script setup lang="ts">
defineProps<{ text: string, content: string }>()
</script>

<template>
  <UPopover>
    <UButton :label="text" color="info" variant="ghost" class="cursor-pointer" />

    <template #content>
      <div class="p-4 bg-neutral-900 max-w-[500px] rounded border border-neutral-600">
        {{ content }}
      </div>
    </template>
  </UPopover>
</template>
