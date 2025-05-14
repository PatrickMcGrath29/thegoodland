<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { data: collections } = await useAsyncData('collections', () => useCollections())

const route = useRoute()

const mobileMenuOpen = ref(false)
const searchOpen = ref(false)

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
    {
      label: 'Search',
      onSelect: () => searchOpen.value = true,
      icon: 'ph:magnifying-glass-duotone',
      class: 'cursor-pointer',
    },
  ] satisfies NavigationMenuItem[])
})

const groups = ref([
  {
    id: 'users',
    label: 'Users',
    items: [
      {
        label: 'Benjamin Canac',
        suffix: 'benjamincanac',
        avatar: {
          src: 'https://github.com/benjamincanac.png',
        },
      },
      {
        label: 'Sylvain Marroufin',
        suffix: 'smarroufin',
        avatar: {
          src: 'https://github.com/smarroufin.png',
        },
      },
      {
        label: 'Sébastien Chopin',
        suffix: 'atinux',
        avatar: {
          src: 'https://github.com/atinux.png',
        },
      },
      {
        label: 'Romain Hamel',
        suffix: 'romhml',
        avatar: {
          src: 'https://github.com/romhml.png',
        },
      },
      {
        label: 'Haytham A. Salama',
        suffix: 'Haythamasalama',
        avatar: {
          src: 'https://github.com/Haythamasalama.png',
        },
      },
      {
        label: 'Daniel Roe',
        suffix: 'danielroe',
        avatar: {
          src: 'https://github.com/danielroe.png',
        },
      },
      {
        label: 'Neil Richter',
        suffix: 'noook',
        avatar: {
          src: 'https://github.com/noook.png',
        },
      },
    ],
  },
])
const searchTerm = ref('')
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
          <UNavigationMenu :items="navItems" class="w-full justify-center" content-orientation="vertical" />
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
        </ul>
      </div>
    </Container>
    <UModal v-model:open="searchOpen">
      <template #content>
        <UCommandPalette v-model:search-term="searchTerm" :groups="groups" placeholder="Search..." class="h-80" />
      </template>
    </UModal>
  </header>
</template>
