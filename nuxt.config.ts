export default defineNuxtConfig({
  app: {
    head: {
      script: [
        { src: 'https://www.statcounter.com/counter/counter.js', async: true, tagPosition: 'bodyClose' },
        {
          children: 'var sc_project=12970879;  var sc_invisible=1;  var sc_security=\'bf0a1ebf\'; ',
          tagPosition: 'bodyClose',
        },
      ],
      noscript: [
        {
          innerHTML: '<div class=\'statcounter\'><a title=\'Web Analytics Made Easy - Statcounter\' href=\'https://statcounter.com/\' target=\'_blank\'><img class=\'statcounter\' src=\'https://c.statcounter.com/12970879/0/bf0a1ebf/1/\' alt=\'Web Analytics Made Easy - Statcounter\' referrerPolicy=\'no-referrer-when-downgrade\'></a></div>',
          tagPosition: 'bodyClose',
        },
      ],
    },
  },
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
  experimental: {
    viewTransition: true,
  },
  routeRules: {
    '/2021/08/23/entering-into-the-good-land': { redirect: '/posts/2021-08-23-entering-into-the-good-land' },
    '/2021/09/28/lord-shine-your-light': { redirect: '/posts/2021-09-28-lord-shine-your-light' },
    '/2021/09/30/come-to-me': { redirect: '/posts/2021-09-30-come-to-me-learn-from-me' },
    '/2021/10/23/as-for-god-his-way-is-perfect': { redirect: '/posts/2021-10-23-as-for-god-his-way-is-perfect' },
    '/2022/01/05/opening-to-the-lord': { redirect: '/posts/2022-01-05-opening-to-the-lord' },
    '/2022/01/29/walking-with-god-in-famine': { redirect: '/posts/2022-01-29-walking-with-god-in-famine' },
    '/2022/04/09/the-appearing-of-jesus-christ': { redirect: '/posts/2022-04-09-the-appearing-of-jesus-christ' },
    '/2022/07/01/if-only-i-may-touch-the-edge-of-his-garment': { redirect: '/posts/2022-07-01-if-only-i-may-touch-the-edge-of-his-garment' },
    '/2022/07/08/lead-me-in-the-way-everlasting': { redirect: '/posts/2022-07-08-lead-me-in-the-way-everlasting' },
    '/2022/09/26/a-wholehearted-pursuit-of-god': { redirect: '/posts/2022-09-26-a-wholehearted-pursuit-of-god' },
    '/2022/11/22/the-exchanged-life-by-hudson-taylor': { redirect: '/posts/2022-11-22-the-exchanged-life' },
    '/2022/12/02/advice-on-reading-the-bible': { redirect: '/posts/2022-12-02-advice-on-reading-the-bible' },
    '/2022/12/28/looking-unto-jesus-by-theodore-monod': { redirect: '/posts/2022-12-28-looking-unto-jesus' },
    '/2023/03/26/the-great-god-entertainment': { redirect: '/posts/2023-03-26-the-great-god-entertainment' },
    '/2023/05/07/the-absolute-lordship-of-christ': { redirect: '/posts/2023-05-07-the-indwelling-and-lordship-of-christ' },
    '/2023/05/20/walking-by-the-spirit': { redirect: '/posts/2023-05-20-living-by-the-spirit' },
    '/2023/06/07/lord-make-me-a-man-after-thine-own-heart': { redirect: '/posts/2023-06-07-lord-make-me-a-man-after-thine-own-heart' },
    '/2023/11/04/our-approach-to-god-christ-our-way': { redirect: '/posts/2023-11-04-our-approach-to-god-the-work-of-christ' },
    '/2023/11/15/not-knowing-the-things-that-shall-befall-me': { redirect: '/posts/2023-11-15-not-knowing-the-things-that-shall-befall-me' },
    '/2024/02/09/motives-in-looking-unto-jesus': { redirect: '/posts/2024-02-10-motives-in-looking-unto-jesus' },
    '/wp-content/uploads/2023/05/the_practice_of_the_presence_of_god.pdf': { redirect: '/uploads/the_practice_of_the_presence_of_god.pdf' },
    '/wp-content/uploads/2023/05/abide_in_christ.pdf': { redirect: '/uploads/abide_in_christ.pdf' },
    '/wp-content/uploads/2023/05/the_pursuit_of_god.pdf': { redirect: '/uploads/the_pursuit_of_god.pdf' },
  },
})
