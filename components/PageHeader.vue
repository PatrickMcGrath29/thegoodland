<script setup lang="ts">
import type { BreadCrumb } from '~/types'

const { heading, breadCrumbs = [] } = defineProps<{ heading: string, subheading?: string, subtitle?: string, breadCrumbs?: BreadCrumb[] }>()
</script>

<template>
  <div v-if="breadCrumbs.length > 0" class="my-5 md:my-8 text-neutral-400 font-medium text-sm text-center md:text-left">
    <template v-for="(crumb, idx) in breadCrumbs" :key="idx">
      <template v-if="crumb.link">
        <NuxtLink :to="crumb.link" class="hover:text-accent hover:text-opacity-70">
          {{ crumb.text }}
        </NuxtLink>
      </template>
      <template v-else>
        <span class="text-neutral-500">
          {{ crumb.text }}
        </span>
      </template>
      <span v-if="idx + 1 !== breadCrumbs.length" class="mx-2 text-neutral-700">/</span>
    </template>
  </div>

  <div
    class="flex items-center flex-col md:flex-row"
    :class="{ 'my-10 md:my-14': breadCrumbs.length === 0, 'mb-10 md:mb-14': breadCrumbs.length > 0 }"
  >
    <div v-if="subtitle" class="text-xl border-neutral-500 font-light text-neutral-500 hidden md:block border-r pr-4">
      {{ subtitle }}
    </div>
    <div class="text-center md:text-left" :class="{ 'pt-1 md:pl-4 md:pt-0': subtitle }">
      <h1 class="text-4xl font-bold">
        {{ heading }}
      </h1>
      <h2 v-if="subheading" class="text-base text-neutral-400 pt-0.5">
        {{ subheading }}
      </h2>
    </div>
  </div>
</template>
