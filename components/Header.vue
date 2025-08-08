<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { data: collections } = await useAsyncData('collections', () => useCollections())

const route = useRoute()

const mobileMenuOpen = ref(false)
const settingsStore = useSettingsStore()

const isPostRoute = computed(() => {
  return route.path === '/posts'
})

const isQuoteRoute = computed(() => {
  return route.path.startsWith('/quotes')
})

const groups = ref([
  {
    id: 'apps',
    items: [
      {
        label: 'Calendar',
        icon: 'i-lucide-calendar',
      },
      {
        label: 'Music',
        icon: 'i-lucide-music',
      },
      {
        label: 'Maps',
        icon: 'i-lucide-map',
      },
    ],
  },
])

watch(route, () => {
  mobileMenuOpen.value = false
})

const navItems = computed(() => {
  return ([
    {
      label: 'Blog',
      to: '/posts',
      icon: 'ph:scroll-duotone',
    },
    {
      label: 'Collections',
      to: '/collections',
      defaultOpen: true,
      children: collections.value?.map(collection => ({
        label: collection.name,
        to: `/collections/${collection.slug}`,
        description: collection.author ? `by ${collection.author}` : undefined,
      })),
      icon: 'ph:book-open-duotone',
    },
    {
      label: 'Quotes',
      to: '/quotes',
      icon: 'ph:pen-nib-duotone',
    },
  ] satisfies NavigationMenuItem[])
})

const desktopNavItems = computed(() => {
  return [
    ...navItems.value,
    {
      label: 'Search',
      onSelect: () => settingsStore.searchOpen = true,
      icon: 'ph:magnifying-glass-duotone',
      class: 'cursor-pointer',
    },
  ]
})
</script>

<template>
  <header class="my-3">
    <Container>
      <div class="flex bg-neutral-800 rounded-lg justify-between px-3 py-1.5 shadow-md">
        <div class="navbar-start">
          <UButton to="/" variant="ghost" class="text-neutral hover:bg-neutral-700 active:bg-neutral-700">
            <LogoIcon class="size-9 fill-accent mr-0.5 bg-neutral-700 p-1.5 rounded-md" />
            <h3 class="normal-case font-semibold text-2xl flex justify-center">
              The Good Land
            </h3>
          </UButton>
        </div>
        <ul class="px-1 gap-1 items-center hidden md:flex">
          <UNavigationMenu :items="desktopNavItems" class="w-full justify-center" content-orientation="vertical" />
        </ul>
        <ul class="flex items-center md:hidden gap-2">
          <UButton variant="ghost" color="neutral" @click="settingsStore.searchOpen = true">
            <Icon name="ph:magnifying-glass-duotone" size="20px" />
          </UButton>
          <UPopover v-model:open="mobileMenuOpen" :modal="true">
            <UButton label="Open" color="neutral" variant="ghost">
              <Icon name="i-lucide-menu" size="20px" />
            </UButton>

            <template #content>
              <UNavigationMenu
                :ui="{
                  linkLabel: 'text-base',
                  root: 'p-2',
                }" orientation="vertical" :items="navItems"
                class="w-full justify-center data-[orientation=vertical]:w-65" content-orientation="vertical"
              />
            </template>
          </UPopover>
        </ul>
      </div>
      <GlobalSearch />
    </Container>

    <div v-if="isQuoteRoute" class="mt-3">
      <Container>
        <div class="flex justify-around sm:justify-start bg-neutral-800 rounded-lg shadow-md sm:px-1">
          <QuoteDropdownExplorer class="w-full flex justify-center sm:justify-start" />
        </div>
      </Container>
    </div>
  </header>
</template>
