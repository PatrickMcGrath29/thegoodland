const ERROR_MESSAGES_TO_RETRY = [
  'Failed to fetch dynamically imported module',
  'Loading chunk',
  'Failed to load resource',
  'Cannot read properties of undefined',
]

const MAX_RELOAD_ATTEMPTS = 3
const RELOAD_ATTEMPT_TIMEOUT = 30_000

export default defineNuxtPlugin(() => {
  const route = useRoute()
  const router = useRouter()

  let reloadAttempts = 0
  let lastAttemptTime = 0

  const handleChunkError = (error: Error) => {
    const shouldRetry = ERROR_MESSAGES_TO_RETRY.some(message => error.message.includes(message))
    if (shouldRetry) {
      console.error('Chunk loading error detected:', error)

      const now = Date.now()

      if (now - lastAttemptTime > RELOAD_ATTEMPT_TIMEOUT) {
        reloadAttempts = 0
        lastAttemptTime = now
      }

      if (reloadAttempts < MAX_RELOAD_ATTEMPTS) {
        reloadAttempts++

        router.push({
          path: route.path,
          query: {
            _t: now,
          },
        })
      }
      else {
        console.error('Max reload attempts reached. Please try clearing your browser cache or contact support.')
      }
    }
  }

  router.onError(handleChunkError)
})
