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

const fullUrl = computed(() => {
  let href = props.href

  if (props.href.startsWith('http'))
    return props.href

  if (href.startsWith('/public'))
    href = href.replace('/public', '')

  return new URL(href, baseUrl).toString()
})
</script>

<template>
  <NuxtLink :href="fullUrl" target="_blank" class="link">
    <slot />
  </NuxtLink>
</template>
