<template>
  <blockquote class="border-l-2 border-neutral-400 pl-3 mb-7 custom-blockquote">
    <slot />
  </blockquote>
</template>

<style lang="scss">
.custom-blockquote footer {
  @apply mt-3 font-medium;
}
</style>
