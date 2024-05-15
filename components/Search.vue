<script setup lang="ts">
import type { Post } from '~/types'

const { data: posts } = await useAsyncData(
  'allPosts',
  () => usePosts(),
)

const searchString = ref('')
const activePostIdx = ref(0)

const { Command_K } = useMagicKeys()

const matchingPosts = computed(() => {
  const stripString = (text: string) => {
    return text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
  }

  return (posts.value as Post[]).filter((post) => {
    const textToSearch = [
      post.title,
      post.author,
    ]

    return textToSearch.some((text) => {
      return text !== undefined && text !== null && stripString(text).includes(stripString(searchString.value))
    })
  })
})

const matchingSearchTerms: Ref<string[]> = computed(() => {
  if (searchString.value.length < 3)
    return []

  const possibleTerms = matchingPosts.value.flatMap((post) => {
    return [post.author]
  }).filter((searchTerm) => {
    return searchTerm !== undefined && searchTerm !== searchString.value
  }) as string[]

  return [...new Set(possibleTerms)]
})

const modalVisibile = ref(false)
const searchInput = ref<HTMLElement>()

watch(Command_K, (v) => {
  if (v && !modalVisibile.value)
    modalVisibile.value = true
})

watch(searchString, () => {
  activePostIdx.value = 0
})

watch(modalVisibile, (v) => {
  if (v) {
    searchString.value = ''
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
})

onKeyStroke('ArrowDown', (e) => {
  if (modalVisibile.value && activePostIdx.value < matchingPosts.value.length - 1) {
    activePostIdx.value++
    e.preventDefault()
  }
})

onKeyStroke('ArrowUp', (e) => {
  if (modalVisibile.value && activePostIdx.value > 0) {
    activePostIdx.value--
    e.preventDefault()
  }
})

onKeyStroke('Enter', () => {
  if (!modalVisibile.value)
    return

  const selectedQuote = matchingPosts.value[activePostIdx.value]
  if (selectedQuote) {
    modalVisibile.value = false
    navigateTo(`/quote/${matchingPosts.value[activePostIdx.value].uuid}`)
  }
})
</script>

<template>
  <slot name="activator" :click-fn="() => modalVisibile = true" />
  <Dialog
    v-model:visible="modalVisibile"
    :show-header="false" :modal="true" :pt="{
      mask: {
        style: 'backdrop-filter: blur(2px)',
      },
    }"
    class="p-6 bg-base-300 w-full max-w-2xl h-full"
  >
    <div class="mt-1 mb-4 text-center flex justify-center gap-1 space-x-2">
      <input
        ref="searchInput" v-model="searchString" type="text" placeholder="Search"
        class="input input-md input-bordered input-primary w-full"
      >
      <div class="inline-block">
        <button class="btn btn-primary" @click="modalVisibile = false">
          Close
        </button>
      </div>
    </div>

    <div v-if="matchingSearchTerms.length > 0" class="mb-4 border rounded-md border-primary px-2 py-3">
      <div class="flex gap-2 overflow-x-auto scrollbar-none snap-x">
        <button
          v-for="searchTerm in matchingSearchTerms" :key="searchTerm"
          class="text-nowrap snap-start btn btn-sm btn-ghost break-keep" @click="searchString = searchTerm"
        >
          {{ searchTerm }}
        </button>
      </div>
    </div>

    <div class="overflow-y-auto max-h-screen divide-y divide-slate-700">
      <NuxtLink
        v-for="(post, idx) in matchingPosts" :key="post.uuid"
        class="card py-5 px-3 rounded-none hover:bg-base-100" :to="`/posts/${post.slug}`"
        :class="{ 'bg-base-100': idx === activePostIdx }" @click="modalVisibile = false"
      >
        <div class="flex flex-col">
          <div class="mb-2 text-lg">
            {{ post.title }}
          </div>
          <h5 class="text-sm text-neutral-400 font-semibold">
            {{ useFormattedDate(post.createdDate) }}
          </h5>
          <h5 v-if="post.author" class="text-sm mt-1">
            by {{ post.author }}
          </h5>
        </div>
      </NuxtLink>
      <div v-if="matchingPosts.length === 0" class="text-center my-5">
        No results found.
      </div>
    </div>
  </Dialog>
</template>
