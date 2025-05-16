<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useIsSmallScreen } from '~/shared/utils'

const { data: collections } = await useAsyncData('collections', () => useCollections())

const route = useRoute()

const mobileMenuOpen = ref(false)
const searchOpen = ref(false)

const isSmallScreen = useIsSmallScreen()

const { Command_K, Ctrl_K } = useMagicKeys()

onMounted(() => {
  watch([Command_K, Ctrl_K], (v) => {
    if (searchOpen.value)
      return

    if (v)
      searchOpen.value = true
  })
})

watch(route, () => {
  mobileMenuOpen.value = false
  searchOpen.value = false
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
      onSelect: () => searchOpen.value = true,
      icon: 'ph:magnifying-glass-duotone',
      class: 'cursor-pointer',
    },
  ]
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
        <ul class="px-1 gap-1 items-center hidden md:flex">
          <UNavigationMenu :items="desktopNavItems" class="w-full justify-center" content-orientation="vertical" />
        </ul>
        <ul class="flex items-center md:hidden">
          <UPopover v-model:open="mobileMenuOpen">
            <UButton label="Open" color="neutral" variant="ghost">
              <Icon name="i-lucide-menu" size="25px" />
            </UButton>

            <template #content>
              <UNavigationMenu
                orientation="vertical" :items="navItems"
                class="w-full justify-center data-[orientation=vertical]:w-48" content-orientation="vertical"
              />
            </template>
          </UPopover>
          <UButton variant="ghost" color="neutral" @click="searchOpen = true">
            <Icon name="ph:magnifying-glass-duotone" size="20px" />
          </UButton>
        </ul>
      </div>
    </Container>
    <UModal v-model:open="searchOpen" class="max-w-2xl" :class="{ 'h-80': !isSmallScreen }" :fullscreen="isSmallScreen">
      <template #content>
        <GlobalSearch />
      </template>
    </UModal>
  </header>
</template>
