<script setup lang="ts">
import type { Quote } from '~/types'
import { slugify } from '~/shared/utils'

const { quote, showFullPageLink = true, previewMode = false } = defineProps<{
  quote: Quote
  showFullPageLink?: boolean
  previewMode?: boolean
}>()
</script>

<template>
  <div class="flex flex-col h-full">
    <RefTagger
      class="[&_a.rtBibleRef]:underline [&_a.rtBibleRef]:decoration-1 [&_a.rtBibleRef]:underline-offset-2 mb-4"
    >
      <p class="whitespace-pre-wrap text-base" :class="{ 'line-clamp-7 min-h-[7lh]': previewMode }">
        {{ quote.text }}
      </p>
    </RefTagger>

    <!-- Reference Name -->
    <div :class="{ 'min-h-lh': previewMode }">
      <NuxtLink
        v-if="quote.reference?.referenceName"
        class="text-base font-semibold underline decoration-neutral-500 hover:text-accent flex items-center gap-1.5 w-fit"
        :to="`/quotes/reference/${quote.reference?.referenceSlug}`" @click.stop
      >
        <Icon name="ph:bookmark-simple-duotone" size="15px" class="text-accent text-opacity-40" />
        {{ quote.reference.referenceName }}
      </NuxtLink>
    </div>

    <!-- Author Name -->
    <div>
      <NuxtLink
        class="text-sm italic underline decoration-neutral-500 hover:text-accent flex items-center gap-1.5 w-fit"
        :to="quote.reference?.authorName ? `/quotes/author/${quote.reference?.authorSlug}` : ''" @click.stop
      >
        <Icon name="ph:pen-nib-duotone" size="15px" class="text-accent text-opacity-40" />
        by {{ quote.reference?.authorName || "Anonymous" }}
      </NuxtLink>
    </div>

    <!-- Continue Reading -->
    <div v-if="!previewMode && (quote.link || quote.reference?.link)" class="text-sm text-blue-300 flex gap-3 mt-3">
      <a
        :href="quote.link || quote.reference?.link" class="flex items-center gap-1 hover:underline" nofollow
        @click.stop
      >
        <Icon name="ci:external-link" />
        Continue Reading
      </a>
    </div>

    <!-- Categories & Link -->
    <div class="flex flex-wrap gap-5 items-center justify-between w-full mt-5">
      <div class="flex flex-nowrap gap-2">
        <UButton
          v-for="category in quote.categories" :key="category" size="xs" variant="soft" color="neutral"
          class="bg-neutral-700" :to="`/quotes/category/${slugify(category)}`"
        >
          {{ category }}
        </UButton>
      </div>
      <div v-if="!previewMode">
        <UButton
          v-if="showFullPageLink" :to="`/quotes/${quote.uuid}/${quote.slug}`" trailing-icon="ph:arrow-right"
          variant="ghost" color="primary" size="sm" @click.stop
        >
          View Full Page
        </UButton>
      </div>
    </div>
  </div>
</template>
