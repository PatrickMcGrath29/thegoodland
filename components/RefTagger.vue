<script setup lang="ts">
declare global {
  interface Window {
    refTagger: any
  }
}

const REFTAGGER_SCRIPT_ID = 'reftagger-source'
const REFTAGGER_SCRIPT_URL = 'https://api.reftagger.com/v2/RefTagger.js'
const REFTAGGER_SETTINGS = {
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
}

const slotRef = ref<HTMLElement>()
const slots = useSlots()

const scriptAdded = ref(false)

function maybeAddScript() {
  if (scriptAdded.value)
    return

  if (document.getElementById(REFTAGGER_SCRIPT_ID)) {
    scriptAdded.value = true
    return
  }

  scriptAdded.value = true

  const el = document.createElement('script')
  el.type = 'text/javascript'
  el.async = true
  el.src = REFTAGGER_SCRIPT_URL
  el.id = REFTAGGER_SCRIPT_ID
  document.getElementsByTagName('body')[0].appendChild(el)
}

function addRefTagger(settings: any): void {
  window.refTagger = { settings }
}

onMounted(() => {
  maybeAddScript()

  if (window && !window.refTagger)
    addRefTagger(REFTAGGER_SETTINGS)

  if (window.refTagger && window.refTagger.tag) {
    if (slots.default)
      window.refTagger.tag(slotRef.value)
    else window.refTagger.tag()
  }
})
</script>

<template>
  <div ref="slotRef">
    <slot />
  </div>
</template>
