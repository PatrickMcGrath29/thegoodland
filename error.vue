<script setup lang="ts">
const error = useError()

const errorTitle = computed(() => {
  if (error.value?.statusCode === 404)
    return '404'

  return 'Oops'
})

const errorHeading = computed(() => {
  if (error.value?.statusCode === 404)
    return 'Page Not Found.'

  return 'Something went wrong.'
})

const errorSubtitle = computed(() => {
  if (error.value?.statusCode === 404)
    return 'Sorry, we can\'t find that page. Double-check the URL and try again.'

  return 'An unexpected error occurred. Please try again later.'
})
</script>

<template>
  <NuxtLayout>
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center">
        <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
          {{ errorTitle }}
        </h1>
        <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
          {{ errorHeading }}
        </p>
        <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          {{ errorSubtitle }}
        </p>
        <NuxtLink
          to="/"
          class="btn btn-ghost mt-2"
        >
          Back to Homepage
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>
