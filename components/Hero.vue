<script setup lang="ts">
import type { Post } from '~/types'

defineProps<{ featuredPost: Post }>()
</script>

<template>
  <div class="card bg-base-200 px-2 py-8 md:p-8 shadow-md">
    <div class="flex flex-col md:flex-row my-12 md:my-14 mx-2 space-between items-center gap-24">
      <div class="basis-1/2">
        <div class="text-5xl font-semibold text-pretty">
          For the Lord your God is bringing you into a good land.
        </div>
        <div class="text-2xl mt-3">
          Deuteronomy 8:7
        </div>

        <div class="mt-24 text-xl italic text-pretty">
          Literature that highlights the richness of life found in Jesus Christ.
        </div>
      </div>
      <div class="basis-1/2">
        <FeaturedPost :post="featuredPost" />
      </div>
    </div>
  </div>
</template>
