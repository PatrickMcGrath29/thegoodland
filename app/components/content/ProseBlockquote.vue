<template>
  <blockquote
    class="border-l-[2px] border-accent/50 bg-neutral-800 rounded-r-md [&>*]:m-0 p-2 pl-3 mb-7 custom-blockquote shadow-md"
  >
    <slot />
  </blockquote>
</template>

<style lang="scss">
.custom-blockquote footer {
  @apply mt-3 font-medium;
}
</style>
