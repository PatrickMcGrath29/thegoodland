<script setup lang="ts">
function clickHandler() {
  if (document.activeElement instanceof HTMLElement)
    document.activeElement.blur()
}
</script>

<template>
  <li>
    <NuxtLink to="/posts" @click="clickHandler">
      Blog Posts
    </NuxtLink>
  </li>
  <li>
    <details>
      <summary>
        <NuxtLink to="/collections">
          Collections
        </NuxtLink>
      </summary>
      <ul class="p-2 rounded-t-none z-10">
        <li>
          <NuxtLink to="/collections/new-life-lessons-andrew-murray" @click="clickHandler">
            New Life Lessons
          </NuxtLink>
        </li>
      </ul>
    </details>
  </li>
  <li><a href="https://quotes.thegoodland.io">Quotes</a></li>
</template>
