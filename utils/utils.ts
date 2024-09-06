import type { Reference } from '~/types'

export function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
}

export function referenceSlug(authorName: string | undefined, referenceName: string | undefined): string {
  return slugify([
    authorName,
    referenceName,
  ].filter(Boolean).join('-'))
}

export function authorSlug(authorName: string): string {
  return slugify(authorName)
}

export function parseReference(rawReference: any): Reference {
  return {
    uuid: rawReference.uuid.toLowerCase(),
    authorName: rawReference.authorName,
    referenceName: rawReference.referenceName,
    link: rawReference.link,
    referenceSlug: referenceSlug(rawReference.authorName, rawReference.referenceName),
    authorSlug: authorSlug(rawReference.authorName),
  }
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
