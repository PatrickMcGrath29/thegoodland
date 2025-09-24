export function useCanonicalUrl(path?: string) {
  const route = useRoute()
  const config = useRuntimeConfig()

  const currentPath = path || route.path
  const cleanPath = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath

  const canonicalUrl = `${config.public.baseUrl}${cleanPath}`

  useSeoMeta({
    ogUrl: canonicalUrl,
  })

  useHead({
    link: [
      {
        rel: 'canonical',
        href: canonicalUrl,
      },
    ],
  })
}
