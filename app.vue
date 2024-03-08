<script setup lang="ts">
const { public: { scProject, scSecurity } } = useRuntimeConfig()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `The Good Land - ${titleChunk}` : 'The Good Land'
  },
  htmlAttrs: {
    lang: 'en',
  },
  script: [
    { src: 'https://www.statcounter.com/counter/counter.js', async: true, tagPosition: 'bodyClose' },
    {
      children: `var sc_project=${scProject};  var sc_invisible=1;  var sc_security=\'${scSecurity}\'; `,
      tagPosition: 'bodyClose',
    },
  ],
})
</script>

<template>
  <div tabindex="0">
    <Header />
    <NuxtPage />
    <Footer />
  </div>
  <noscript>
    <div class='statcounter'>
    <a title='StatCounter' href='https://statcounter.com/' target='_blank'>
    <img class='statcounter' :src='`https://c.statcounter.com/${scProject}/0/${scSecurity}/1/`' alt='Statcounter' referrerPolicy='no-referrer-when-downgrade'>
    </a>
    </div>
  </noscript>
</template>
