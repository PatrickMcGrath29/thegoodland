export default defineNuxtPlugin(() => {
  useHead({ script: [{ src: 'https://api.reftagger.com/v2/RefTagger.js', tagPosition: 'bodyClose' }] })
})
