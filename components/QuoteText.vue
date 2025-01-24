<script setup lang="ts">
import type { Quote } from '~/types'

const { quote, showPermaLink = true } = defineProps<{
  quote: Quote
  showPermaLink?: boolean
}>()
</script>

<template>
  <div>
    <RefTagger class="[&_a.rtBibleRef]:underline [&_a.rtBibleRef]:decoration-1 [&_a.rtBibleRef]:underline-offset-2">
      <template v-if="showPermaLink">
        <NuxtLink :to="`/quotes/${quote.uuid}/${quote.slug}`">
          <p class="whitespace-pre-wrap text-base">
            {{ quote.text }}
          </p>
        </NuxtLink>
      </template>
      <template v-else>
        <p class="whitespace-pre-wrap text-base">
          {{ quote.text }}
        </p>
      </template>
    </RefTagger>

    <div class="pt-4">
      <div>
        <NuxtLink
          v-if="quote.reference?.referenceName"
          class="text-base font-semibold hover:underline decoration-neutral-400 flex items-center gap-1.5"
          :to="`/quotes/reference/${quote.reference?.referenceSlug}`"
        >
          <Icon name="ph:bookmark-simple-duotone" size="15px" class="text-accent text-opacity-40" />
          {{ quote.reference.referenceName }}
        </NuxtLink>
      </div>
      <div>
        <NuxtLink
          class="text-sm italic hover:underline decoration-neutral-400 flex items-center gap-1.5"
          :to="quote.reference?.authorName ? `/quotes/author/${quote.reference?.authorSlug}` : ''"
        >
          <Icon name="ph:pen-nib-duotone" size="15px" class="text-accent text-opacity-40" />
          by {{ quote.reference?.authorName || "Anonymous" }}
        </NuxtLink>
      </div>
    </div>

    <div v-if="quote.link || quote.reference?.link" class="text-sm text-blue-300 pt-1 mt-3 flex gap-3">
      <a :href="quote.link || quote.reference?.link" class="flex items-center gap-1 hover:underline" nofollow>
        <Icon name="ci:external-link" />
        Continue Reading
      </a>
    </div>
  </div>
</template>
