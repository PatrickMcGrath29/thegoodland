export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseUrl: process.env.URL || 'http://localhost:3000',
    },
  },
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-icon',
    '@nuxt/image',
    '@nuxt/content',
  ],
  image: {
    quality: 80,
    provider: 'ipx',
  },
  routeRules: {
    '/2024/02/09/motives-in-looking-unto-jesus': { redirect: '/posts/v-ebgkpyy1' },
  },
})
