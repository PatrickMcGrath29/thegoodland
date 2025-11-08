<template>
  <blockquote
    class="border-l-2 border-accent/50 bg-neutral-800/70 rounded-r-md *:m-0 px-3 py-2 mb-7 custom-blockquote shadow-md"
  >
    <slot />
  </blockquote>
</template>

<style lang="scss">
.custom-blockquote footer {
  @apply mt-3 font-medium;
}
</style>
