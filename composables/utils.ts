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

export function useFormattedDate(dateValue: Date) {
  return dateValue.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
}

export function useColumnSettings(numElements: number) {
  if (numElements < 3)
    return 'columns-1'
  else
    return 'columns-md'
}
