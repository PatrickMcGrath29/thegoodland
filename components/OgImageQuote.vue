<script setup lang="ts">
interface Props {
  quote: string
  author?: string
  reference?: string
}

const props = defineProps<Props>()

// Truncate quote text to fit in the OG image
const MAX_QUOTE_LENGTH = 280
const truncatedQuoteText = computed(() => {
  if (props.quote.length <= MAX_QUOTE_LENGTH) {
    return props.quote
  }
  // Find the last complete word before the limit
  const truncated = props.quote.substring(0, MAX_QUOTE_LENGTH)
  const lastSpaceIndex = truncated.lastIndexOf(' ')
  return lastSpaceIndex > 0 ? `${truncated.substring(0, lastSpaceIndex)}...` : `${truncated}...`
})
</script>

<template>
  <div
    :style="{
      display: 'flex',
      height: '100%',
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%)',
      padding: '48px',
      color: 'white',
      fontFamily: 'system-ui, sans-serif',
    }"
  >
    <!-- Header with site branding -->
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }"
    >
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }"
      >
        <div
          :style="{
            height: '40px',
            width: '40px',
            borderRadius: '50%',
            background: 'rgba(99, 102, 241, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }"
        >
          📖
        </div>
        <span
          :style="{
            fontSize: '20px',
            fontWeight: '600',
            color: '#6366f1',
          }"
        >The Good Land</span>
      </div>
      <div
        :style="{
          fontSize: '14px',
          color: '#9ca3af',
        }"
      >
        Quotes
      </div>
    </div>

    <!-- Main quote content -->
    <div
      :style="{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '32px 0',
      }"
    >
      <!-- Quote text -->
      <div
        :style="{
          fontSize: '24px',
          lineHeight: '1.6',
          fontWeight: '300',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: '32px',
        }"
      >
        {{ truncatedQuoteText }}
      </div>

      <!-- Attribution -->
      <div
        :style="{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }"
      >
        <div
          v-if="reference" :style="{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '18px',
            fontWeight: '500',
            color: '#6366f1',
          }"
        >
          📚 {{ reference }}
        </div>
        <div
          v-if="author" :style="{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '16px',
            color: '#d1d5db',
          }"
        >
          ✍️ by {{ author }}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '14px',
        color: '#9ca3af',
      }"
    >
      <div>Share this quote</div>
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }"
      >
        <div
          :style="{
            height: '8px',
            width: '8px',
            borderRadius: '50%',
            background: 'rgba(99, 102, 241, 0.6)',
          }"
        />
        <div
          :style="{
            height: '8px',
            width: '8px',
            borderRadius: '50%',
            background: 'rgba(99, 102, 241, 0.4)',
          }"
        />
        <div
          :style="{
            height: '8px',
            width: '8px',
            borderRadius: '50%',
            background: 'rgba(99, 102, 241, 0.2)',
          }"
        />
      </div>
    </div>
  </div>
</template>
