export default defineNuxtPlugin(() => {
  const router = useRouter()

  const MAX_RELOAD_ATTEMPTS = 3
  const RELOAD_ATTEMPT_TIMEOUT = 30_000
  let reloadAttempts = 0
  let lastAttemptTime = 0

  router.onError((error) => {
    if (
      error.message.includes('Failed to fetch dynamically imported module')
      || error.message.includes('Loading chunk')
      || error.message.includes('Failed to load resource')
    ) {
      console.error('Chunk loading error detected:', error)

      const now = Date.now()

      // Reset count if more than 30 seconds have passed since last attempt
      if (now - lastAttemptTime > RELOAD_ATTEMPT_TIMEOUT) {
        reloadAttempts = 0
        lastAttemptTime = now
      }

      if (reloadAttempts < MAX_RELOAD_ATTEMPTS) {
        reloadAttempts++

        // Attempt reload with cache-busting parameter
        setTimeout(() => {
          window.location.href = `${window.location.href
          + (window.location.href.includes('?') ? '&' : '?')
          }_t=${now}`
        }, 1000)
      }
      else {
        console.error('Max reload attempts reached. Please try clearing your browser cache or contact support.')
      }
    }
  })
})
