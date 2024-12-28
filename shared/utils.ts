export function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
}

export function referenceSlug(authorName: string | undefined, referenceName: string): string | undefined {
  if (!authorName && !referenceName)
    return undefined

  return slugify([
    authorName,
    referenceName,
  ].filter(Boolean).join('-'))
}

export function authorSlug(authorName: string): string | undefined {
  if (!authorName)
    return undefined

  return slugify(authorName)
}

export function getPath(record: any): string {
  return record._path.split('/').at(-1) as string
}

export function toDayOfYear(date: Date): number {
  return Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000,
  )
}

export function smartEllipsis(text: string, length: number) {
  if (text.length > length) {
    const index = text.substring(0, length - 1)
    text = `${index.substring(0, index.lastIndexOf(' '))}...`
  }
  return text
}

export function formatDate(dateValue: Date) {
  return dateValue.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
}

export function dayOfYear() {
  return Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
  )
}

export function normalizeInput(input: string | undefined): string {
  if (!input)
    return ''

  return input.toLowerCase().replace('.', '')
}
