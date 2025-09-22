<script setup lang="ts">
const quotes = await useQuotes()
const quoteCategories = useQuoteCategories(quotes)

const featuredCategories = quoteCategories.sort((a, b) => b.count - a.count).slice(0, 20)
</script>

<template>
  <div class="mt-16 mb-24">
    <SectionHeader heading="Explore Quotes" subheading="See All" link="/quotes" />

    <!-- <h3 class="text-2xl font-semibold mb-8">
      Explore Quotes by Category
    </h3> -->
    <div class="flex flex-col md:flex-row items-center gap-10">
      <div class="space-x-2 space-y-2 col-span-1 basis-1/2">
        <UButton v-for="(category, idx) in featuredCategories" :key="idx" variant="soft" :to="category.slug">
          {{ category.name }}
        </UButton>
      </div>

      <div class="col-span-1 basis-1/2">
        <div class="text-2xl text-toned leading-1.2">
          “Come, let the proud man boast in his honor, and the mighty man is his valor, and the rich man in his
          wealth, but let the Christian pronounce himself happy, only happy, truly happy, fully happy in beholding
          Christ,
          enjoying Christ, having Christ, in looking unto Jesus.”
        </div>
        <div class="font-semibold mt-2 text-muted">
          — Isaac Ambrose
        </div>
      </div>
    </div>
  </div>
</template>
