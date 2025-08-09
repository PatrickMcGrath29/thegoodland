import type { FuseResult, FuseResultMatch } from 'fuse.js'

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

function truncateHTMLFromStart(html: string, maxLength: number) {
  let truncated = ''
  let totalLength = 0
  let insideTag = false

  // Iterate through the HTML string in reverse order
  for (let i = html.length - 1; i >= 0; i--) {
    if (html[i] === '>') {
      insideTag = true
    }
    else if (html[i] === '<') {
      insideTag = false
      truncated = html[i] + truncated
      continue
    }

    if (!insideTag) {
      totalLength++
    }

    if (totalLength <= maxLength) {
      truncated = html[i] + truncated
    }
    else {
      // If we've reached the max length, we break out of the loop
      // to prevent further processing of the string
      truncated = `...${truncated}`
      break
    }
  }

  return truncated
}

export function highlight<T>({
  item,
  searchTerm,
  forceKey,
  omitKeys,
  truncate = true,
}: {
  item: T & { matches?: FuseResult<T>['matches'] }
  searchTerm: string
  forceKey?: string
  omitKeys?: string[]
  truncate?: boolean
}) {
  function generateHighlightedText(value: FuseResultMatch['value'], indices: FuseResultMatch['indices'] = []) {
    value = value || ''
    let content = ''
    let nextUnhighlightedRegionStartingIndex = 0

    indices.forEach((region) => {
      // skip if region is a single character
      if (region.length === 2 && region[0] === region[1]) {
        return
      }

      const lastIndiceNextIndex = region[1] + 1
      const isMatched = (lastIndiceNextIndex - region[0]) >= searchTerm.length

      content += [
        value.substring(nextUnhighlightedRegionStartingIndex, region[0]),
        isMatched && `<mark>`,
        value.substring(region[0], lastIndiceNextIndex),
        isMatched && '</mark>',
      ].filter(Boolean).join('')

      nextUnhighlightedRegionStartingIndex = lastIndiceNextIndex
    })

    content += value.substring(nextUnhighlightedRegionStartingIndex)

    if (truncate) {
      const markIndex = content.indexOf('<mark>')
      if (markIndex !== -1) {
        content = truncateHTMLFromStart(content, content.length - markIndex)
      }
    }

    return content
  }

  if (!item.matches?.length) {
    return
  }

  for (const match of item.matches) {
    if (forceKey && match.key !== forceKey) {
      continue
    }
    if (omitKeys?.includes(match.key!)) {
      continue
    }

    return generateHighlightedText(match.value, match.indices)
  }
}
