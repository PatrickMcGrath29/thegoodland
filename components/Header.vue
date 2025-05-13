<script setup lang="ts">
const { data: collections } = await useAsyncData('collections', () => useCollections())

const navItems = computed(() => {
  return ([
    {
      label: 'Blog Posts',
      to: '/posts',
    },
    {
      label: 'Quotes',
      to: '/quotes',
    },
    {
      label: 'Collections',
      to: '/collections',
      children: collections.value?.map(collection => ({
        label: collection.name,
        to: `/collections/${collection.slug}`,
      })),
    },
  ])
})
</script>

<template>
  <header class="my-3">
    <Container>
      <div class="flex bg-neutral-800 rounded-lg justify-between px-3 py-1.5 shadow-lg">
        <div class="navbar-start">
          <UButton to="/" variant="ghost" class="text-neutral hover:bg-neutral-700">
            <LogoIcon class="size-9 fill-accent mr-0.5 bg-neutral-700 p-1.5 rounded-md" />
            <h3 class="normal-case font-semibold text-2xl flex justify-center">
              The Good Land
            </h3>
          </UButton>
        </div>
        <ul class="flex px-1 gap-1 items-center">
          <UNavigationMenu :items="navItems" class="w-full justify-center" content-orientation="vertical" />
        </ul>
      </div>
    </Container>
  </header>
</template>
