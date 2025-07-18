<script setup lang="ts">
import type { Post } from '~~/types'

defineProps<{ featuredPost: Post }>()
</script>

<template>
  <div class="py-8">
    <div class="flex flex-col md:flex-row my-12 md:my-14 space-between items-center gap-24 md:gap-12 lg:gap-24">
      <div class="basis-1/2">
        <div class="text-5xl font-semibold text-pretty">
          For the Lord your God is bringing you into a good land.
        </div>
        <div class="text-xl mt-3 font-medium text-neutral-400">
          Deuteronomy 8:7
        </div>

        <h1 class="mt-24 text-xl italic text-pretty">
          Literature that highlights the richness of life found in Jesus Christ.
        </h1>
      </div>
      <div class="basis-1/2">
        <VerticalPostPreview :post="featuredPost" is-featured />
      </div>
    </div>
  </div>
</template>
