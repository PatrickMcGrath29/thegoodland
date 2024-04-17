<template>
  <div
    class="
    float-right w-full sm:w-[300px]
    border-y border-neutral-500
    py-8 !ml-10 !mr-0 my-10
    [&>*]:mb-0 [&>*]:text-2xl [&>*]:italic
    [&>*]:before:content-['“'] [&>*]:after:content-['”']
    "
  >
    <slot />
  </div>
</template>
