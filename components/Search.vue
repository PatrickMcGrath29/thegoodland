<script setup lang="ts">
import { smartEllipsis } from '~/shared/utils'

defineProps({
  showIcon: {
    type: Boolean,
    default: false,
  },
})
const { data: quotes } = await useAsyncData('fetchQuotes', () => useQuotes())

const modalVisible = ref(false)
const searchString = ref('')
const activeQuoteIdx = ref(0)

const { Command_K } = useMagicKeys()

const matchingQuotes = computed(() => {
  const stripString = (text: string) => {
    return text.replace(/[^a-z0-9]/gi, '').toLowerCase()
  }

  return quotes.value!.filter((quote) => {
    const textToSearch = [
      quote.text,
      quote.reference?.authorName,
      quote.reference?.referenceName,
    ]

    return textToSearch.some((text) => {
      return text !== undefined && text !== null && stripString(text).includes(stripString(searchString.value))
    })
  })
})

const matchingSearchTerms: Ref<string[]> = computed(() => {
  if (searchString.value.length < 3)
    return []

  const possibleTerms = matchingQuotes.value.flatMap((quote) => {
    return [quote.reference?.authorName, quote.reference?.referenceName]
  }).filter((searchTerm) => {
    return searchTerm !== undefined && searchTerm !== searchString.value
  }) as string[]

  return [...new Set(possibleTerms)]
})

watch(Command_K, (v) => {
  if (v && !modalVisible.value)
    modalVisible.value = true
})

watch(searchString, () => {
  activeQuoteIdx.value = 0
})

onKeyStroke('ArrowDown', (e) => {
  if (modalVisible.value && activeQuoteIdx.value < matchingQuotes.value.length - 1) {
    activeQuoteIdx.value++
    e.preventDefault()
  }
})

onKeyStroke('ArrowUp', (e) => {
  if (modalVisible.value && activeQuoteIdx.value > 0) {
    activeQuoteIdx.value--
    e.preventDefault()
  }
})

onKeyStroke('Enter', async () => {
  if (!modalVisible.value)
    return

  const selectedQuote = matchingQuotes.value[activeQuoteIdx.value]
  if (selectedQuote) {
    modalVisible.value = false
    await navigateTo(`/quote/${selectedQuote.uuid}`)
  }
})

onKeyStroke('Escape', (e) => {
  if (modalVisible.value) {
    modalVisible.value = false
    e.preventDefault()
  }
})
</script>

<template>
  <div class="text-center">
    <button class="btn btn-ghost" @click="modalVisible = true">
      <Icon v-if="showIcon" name="material-symbols:search" size="25px" />
      <span v-else>Search Quotes</span>
    </button>
  </div>
  <ClientOnly>
    <Dialog
      id="filterSearch" modal :visible="modalVisible" :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div
        class="modal-box max-w-2xl flex flex-col h-full overflow-hidden max-md:w-full max-md:max-h-full max-md:rounded-none"
      >
        <div class="mt-1 mb-4 text-center flex justify-center gap-1 space-x-2">
          <input
            v-model="searchString" type="text" placeholder="Search"
            class="input input-md input-bordered input-primary w-full"
          >
          <div class="inline-block">
            <button class="btn btn-primary" @click="modalVisible = false">
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

        <div class="overflow-y-auto scrollbar-thin scrollbar-thumb-primary  max-h-screen divide-y divide-slate-700">
          <NuxtLink
            v-for="(quote, idx) in matchingQuotes" :key="quote.uuid"
            class="card py-5 px-3 rounded-none hover:bg-gray-900" :to="`/quotes/${quote.uuid}/${quote.slug}`"
            :class="{ 'bg-gray-900': idx === activeQuoteIdx }" @click="modalVisible = false"
          >
            <div class="flex flex-col">
              <div class="text-sm mb-2">
                {{ smartEllipsis(quote.text, 175) }}
              </div>
              <h4 v-if="quote.reference?.referenceName" class="card-title text-base">
                {{ quote.reference.referenceName }}
              </h4>
              <h5 class="text-sm ">
                by {{ quote.reference?.authorName || "Anonymous" }}
              </h5>
            </div>
          </NuxtLink>
          <div v-if="matchingQuotes.length === 0" class="text-center my-5">
            No results found.
          </div>
        </div>
      </div>
    </Dialog>
  </ClientOnly>
</template>
