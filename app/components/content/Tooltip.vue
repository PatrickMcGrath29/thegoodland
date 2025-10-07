<script setup lang="ts">
defineProps<{ text: string, content: string }>()
</script>

<template>
  <UPopover>
    <UButton :label="text" color="info" variant="ghost" class="cursor-pointer" size="xs" />

    <template #content>
      <RefTagger>
        <div class="p-4 bg-neutral-900 rounded border border-neutral-600 max-w-[min(500px,90vw)]">
          {{ content }}
        </div>
      </RefTagger>
    </template>
  </UPopover>
</template>
