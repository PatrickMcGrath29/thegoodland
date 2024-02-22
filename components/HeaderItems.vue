<script setup lang="ts">
function clickHandler() {
  if (document.activeElement instanceof HTMLElement)
    document.activeElement.blur()
}
</script>

<template>
  <li>
    <NuxtLink to="/posts" @click="clickHandler">
      All Posts
    </NuxtLink>
  </li>
  <li><a href="https://quotes.thegoodland.io">Quotes</a></li>
</template>
