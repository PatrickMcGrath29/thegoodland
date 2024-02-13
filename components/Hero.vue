<script setup lang="ts">
import type { Post } from '~/types'

defineProps<{ featuredPost: Post }>()
</script>

<template>
  <div class="flex flex-col md:flex-row my-12 md:my-24 mx-2 space-between items-center gap-24">
    <div class="basis-1/2">
      <div class="text-5xl font-semibold text-pretty">
        For the Lord your God is bringing you into a good land.
      </div>
      <div class="text-2xl mt-3">
        Deuteronomy 8:7
      </div>
    </div>
    <div class="basis-1/2">
      <FeaturedPost :post="featuredPost" />
    </div>
  </div>
</template>
