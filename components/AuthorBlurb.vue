<script setup lang="ts">
import type { Author } from '~/types'

defineProps<{
  author: Author
}>()
</script>

<template>
  <div class="max-w-screen-md mx-auto mt-10">
    <StyledCard highlighted-state="disabled">
      <div class="p-2.5 flex gap-5">
        <div>
          <div class="text-base font-semibold">
            {{ author.name }}
          </div>

          <div v-if="author.born && author.died" class="text-sm text-muted">
            {{ author.born }} — {{ author.died }}
          </div>

          <div v-if="author.bio" class="prose prose-neutral dark:prose-invert max-w-none mt-3 text-sm">
            <p>{{ author.bio }}</p>
          </div>
        </div>
      </div>
    </StyledCard>
  </div>
</template>
