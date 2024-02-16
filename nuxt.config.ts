export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseUrl: process.env.DEPLOY_PRIME_URL || 'http://localhost:3000',
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
})
