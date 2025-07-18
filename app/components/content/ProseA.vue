<script setup lang="ts">
const props = defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: undefined,
    required: false,
  },
})

const { public: { baseUrl } } = useRuntimeConfig()

const isAnchor = computed(() => props.href.startsWith('#'))

const parsedUrl = computed(() => {
  let href = props.href

  // A link to an anchor on the same page
  if (isAnchor)
    return href

  if (href.startsWith('http'))
    return href

  if (href.startsWith('/public'))
    href = href.replace('/public', '')

  return new URL(href, baseUrl).toString()
})
</script>

<template>
  <a v-if="isAnchor" :href="parsedUrl" class="link text-blue-500">
    <slot />
  </a>
  <NuxtLink v-else :to="parsedUrl" target="_blank" class="link">
    <slot />
  </NuxtLink>
</template>
