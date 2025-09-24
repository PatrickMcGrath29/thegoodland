<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const posts = await useBlogPosts()
const route = useRoute()
const router = useRouter()

const description = 'Blog posts that highlight the richness of life found in Jesus Christ.'

const summaryTab = 'summary'
const listViewTab = 'list'
const authorTab = 'author'

const postTabs = ref<TabsItem[]>([
  {
    label: 'All Posts',
    value: summaryTab,
  },
  {
    label: 'List View',
    value: listViewTab,
  },
  {
    label: 'By Author',
    value: authorTab,
  },
])

const postsByAuthor = computed(() => {
  const grouped = new Map<string, any[]>()

  ;(posts || []).forEach((post: any) => {
    const author = post.author
    if (!author)
      return

    if (!grouped.has(author))
      grouped.set(author, [])

    grouped.get(author)?.push(post)
  })

  return Array.from(grouped.entries())
    .map(([author, authorPosts]) => ({
      author,
      posts: authorPosts,
    }))
    .sort((a, b) => a.author.localeCompare(b.author))
})

const active = computed(() => {
  return summaryTab
})

// const active = computed({
//   get() {
//     return (route.query.view as string) || summaryTab
//   },
//   set(tab) {
//     router.push({
//       path: '/posts',
//       query: { view: tab },
//     })
//   },
// })

useSeoMeta({
  title: 'The Good Land Blog — Posts',
  description,
  ogDescription: description,
})
</script>

<template>
  <Container>
    <PageHeader heading="All Blog Posts" subtitle="Blog" />

    <!-- <UTabs v-model="active" :items="postTabs" variant="link" class="mb-6" /> -->

    <div v-if="active === summaryTab" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12 mb-10 px-2">
      <VerticalPostPreview v-for="post in posts" :key="post.slug" :post="post" />
    </div>

    <div v-else-if="active === listViewTab">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
        <SmallPostPreview v-for="post in posts" :key="post.slug" :post="post" />
      </div>
    </div>

    <div v-else-if="active === authorTab" class="space-y-10 mb-10 px-2">
      <div v-for="authorGroup in postsByAuthor" :key="authorGroup.author">
        <h2 class="text-xl font-semibold mb-4">
          {{ authorGroup.author }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
          <SmallPostPreview v-for="post in authorGroup.posts" :key="post.slug" :post="post" />
        </div>
      </div>
    </div>
  </Container>
</template>
