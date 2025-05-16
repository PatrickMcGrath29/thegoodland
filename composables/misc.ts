export function useSeoImage(imagePath: string | null) {
  if (!imagePath)
    return null

  const { public: { baseUrl } } = useRuntimeConfig()
  const img = useImage()

  const formattedImagePath = img(
    imagePath,
    { width: 1200, height: 630 },
  )

  return new URL(formattedImagePath, baseUrl).toString()
}

export function useColumnSettings(numElements: number) {
  if (numElements < 3)
    return 'columns-1'
  else
    return 'columns-md'
}

export function useIsSmallScreen() {
  const { width } = useWindowSize()

  return computed(() => {
    return width.value < 1024
  })
}
