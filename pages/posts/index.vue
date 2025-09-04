<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const { data: posts } = await useAsyncData('useBlogPosts', () => useBlogPosts())
const route = useRoute()
const router = useRouter()

const description = 'Blog posts that highlight the richness of life found in Jesus Christ.'

const postTabs = ref<TabsItem[]>([
  {
    label: 'All Posts',
    value: 'all',
  },
  {
    label: 'List View',
    value: 'list',
  },
  {
    label: 'By Category',
    value: 'category',
  },
  {
    label: 'By Author',
    value: 'author',
  },
])

const NUM_GROUPS_TO_SHOW = 8
const NUM_POSTS_PER_GROUP = 6

// Group posts by author
const postsByAuthor = computed(() => {
  const grouped = new Map<string, any[]>()

  ;(posts.value || []).forEach((post: any) => {
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
      posts: authorPosts.slice(0, NUM_POSTS_PER_GROUP),
    }))
    .sort((a, b) => b.posts.length - a.posts.length)
    .slice(0, NUM_GROUPS_TO_SHOW)
})

// Group posts by category (if frontmatter contains categories: string[])
const postsByCategory = computed(() => {
  const grouped = new Map<string, any[]>()

  ;(posts.value || []).forEach((post: any) => {
    const categories = (post.categories || []) as string[]
    if (!Array.isArray(categories) || categories.length === 0)
      return

    categories.forEach((category) => {
      if (!category)
        return
      if (!grouped.has(category))
        grouped.set(category, [])
      grouped.get(category)?.push(post)
    })
  })

  return Array.from(grouped.entries())
    .map(([category, categoryPosts]) => ({
      category,
      posts: categoryPosts.slice(0, NUM_POSTS_PER_GROUP),
    }))
    .sort((a, b) => b.posts.length - a.posts.length)
    .slice(0, NUM_GROUPS_TO_SHOW)
})

const active = computed({
  get() {
    return (route.query.view as string) || 'all'
  },
  set(tab) {
    router.push({
      path: '/posts',
      query: { view: tab },
    })
  },
})

useSeoMeta({
  title: 'The Good Land Blog — Posts',
  description,
  ogDescription: description,
})
</script>

<template>
  <Container>
    <PageHeader heading="All Blog Posts" subtitle="Blog" />

    <UTabs v-model="active" :items="postTabs" variant="link" class="mb-6" />

    <div v-if="active === 'all'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12 mb-10 px-2">
      <VerticalPostPreview v-for="post in posts" :key="post.slug" :post="post" />
    </div>

    <div v-else-if="active === 'category'" class="space-y-10 mb-10 px-2">
      <div v-for="categoryGroup in postsByCategory" :key="categoryGroup.category">
        <h2 class="text-xl font-semibold mb-4">
          {{ categoryGroup.category }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
          <VerticalPostPreview v-for="post in categoryGroup.posts" :key="post.slug" :post="post" />
        </div>
      </div>
    </div>

    <div v-else-if="active === 'author'" class="space-y-10 mb-10 px-2">
      <div v-for="authorGroup in postsByAuthor" :key="authorGroup.author">
        <h2 class="text-xl font-semibold mb-4">
          {{ authorGroup.author }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
          <VerticalPostPreview v-for="post in authorGroup.posts" :key="post.slug" :post="post" />
        </div>
      </div>
    </div>
  </Container>
</template>
