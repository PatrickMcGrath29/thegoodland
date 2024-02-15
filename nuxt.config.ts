export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-icon',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxtjs/seo',
  ],
  image: {
    quality: 80,
    provider: 'ipx',
  },
})
