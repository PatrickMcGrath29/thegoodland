<template>
  <blockquote
    class="border-l-[2px] border-accent border-opacity-50 bg-neutral-900 rounded-r-md [&>*]:m-0 p-2 pl-3 mb-7 custom-blockquote"
  >
    <slot />
  </blockquote>
</template>

<style lang="scss">
.custom-blockquote footer {
  @apply mt-3 font-medium;
}
</style>
