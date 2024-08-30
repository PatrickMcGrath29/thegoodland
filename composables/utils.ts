export function smartEllipsis(text: string, length: number) {
  if (text.length > length) {
    const index = text.substring(0, length - 1)
    text = `${index.substring(0, index.lastIndexOf(' '))}...`
  }
  return text
}

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

export function getPath(record: any): string {
  return record._path.split('/').at(-1) as string
}

export function useFormattedDate(dateValue: Date) {
  return dateValue.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
}

export function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
}

export function toDayOfYear(date: Date): number {
  return Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000,
  )
}

export function useColumnSettings(numElements: number) {
  if (numElements < 3)
    return 'columns-1'
  else
    return 'columns-md'
}
