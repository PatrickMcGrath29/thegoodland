<script setup lang="ts">
const scriptAdded = ref(false)

function addScript() {
  scriptAdded.value = true

  const el = document.createElement('script')
  el.type = 'text/javascript'
  el.async = true
  el.src = `https://api.reftagger.com/v2/RefTagger.js`
  document.getElementsByTagName('body')[0].appendChild(el)
}

function addRefTagger(settings: any): void {
  window.refTagger = { settings }
}

onMounted(() => {
  if (!scriptAdded.value)
    addScript()

  if (window && !window.refTagger) {
    addRefTagger({
      bibleReader: 'bible.faithlife',
      bibleVersion: 'NKJV',
      tooltipStyle: 'dark',
      customStyle: {
        body: {
          fontSize: '18px',
        },
      },
      noSearchTagNames: ['blockquote'],
      roundCorners: true,
      socialSharing: [],
    })
  }

  if (window.refTagger && window.refTagger.tag)
    window.refTagger.tag()
})
</script>

<template>
  <div />
</template>
