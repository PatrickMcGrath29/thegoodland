const ERROR_MESSAGES_TO_RETRY = [
  'Failed to fetch dynamically imported module',
  'Loading chunk',
  'Failed to load resource',
  'Cannot read properties of undefined',
]

const MAX_RELOAD_ATTEMPTS = 3
const RELOAD_ATTEMPT_TIMEOUT = 30_000

export default defineNuxtPlugin((nuxtApp) => {
  let reloadAttempts = 0
  let lastAttemptTime = 0

  const handleChunkError = (error: any) => {
    const shouldRetry = (
      error.message && ERROR_MESSAGES_TO_RETRY.some(msgToRetry => error.message.includes(msgToRetry))
    )

    if (shouldRetry) {
      console.warn('[Deploy Error Handler] Error detected:', error)

      const now = Date.now()

      if (now - lastAttemptTime > RELOAD_ATTEMPT_TIMEOUT) {
        reloadAttempts = 0
        lastAttemptTime = now
      }

      if (reloadAttempts < MAX_RELOAD_ATTEMPTS) {
        reloadAttempts++

        console.warn('[Deploy Error Handler] Reloading after error...')
        location.reload()
      }
      else {
        console.error('[Deploy Error Handler] Max reload attempts reached. Please try clearing your browser cache or contact support.')
      }
    }
  }

  nuxtApp.hook('vue:error', (err) => {
    handleChunkError(err)
  })
})
