<script setup lang="ts">
import type { BreadCrumb } from '~/types'

const { heading, breadCrumbs = [] } = defineProps<{ heading: string, breadCrumbs?: BreadCrumb[] }>()
</script>

<template>
  <div v-if="breadCrumbs.length > 0" class="my-8 text-neutral-400 font-medium text-sm text-center">
    <template v-for="(crumb, idx) in breadCrumbs" :key="idx">
      <template v-if="idx + 1 !== breadCrumbs.length">
        <NuxtLink :to="crumb.link" class="hover:text-accent hover:text-opacity-70">
          {{ crumb.text }}
        </NuxtLink>
        <span class="mx-2 text-neutral-700">/</span>
      </template>
      <template v-else>
        <span class="text-neutral-500">
          {{ crumb.text }}
        </span>
      </template>
    </template>
  </div>

  <h1
    class="flex items-center flex-col md:flex-row"
    :class="{ 'my-10 md:my-14': breadCrumbs.length === 0, 'mb-10 md:mb-14': breadCrumbs.length > 0 }"
  >
    <div
      class="text-2xl border-neutral-500 font-light text-neutral-500 border-b md:border-r md:border-b-0 pb-1 md:pr-4 md:pb-0"
    >
      Quotes
    </div>
    <span class="text-4xl pt-1 md:pl-4 md:pt-0 font-bold text-center md:text-left">{{ heading }}</span>
  </h1>
</template>
