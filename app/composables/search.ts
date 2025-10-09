import type { SearchResult } from 'minisearch'
import type { SearchDocument } from '~/components/GlobalSearch.vue'

export interface Position {
  start: number
  length: number
}
export type SearchPositions = Record<string, Position[]>

export function extractTextFromAst(node: MDCNode, ignoredTags: string[] = []) {
  let text = ''

  // Get text from markdown AST
  if (node.type === 'text') {
    text += (node.value || '')
  }

  // Do not explore children
  if (ignoredTags.includes((node as MDCElement).tag ?? '')) {
    return ''
  }

  // Explore children
  if ((node as MDCElement).children?.length) {
    text += (node as MDCElement).children.map((child: MDCNode) => extractTextFromAst(child, ignoredTags)).filter(Boolean).join('')
  }

  return text
}

export function generateHighlightPositions(
  document: SearchDocument,
  query: string,
): SearchPositions {
  const positions: SearchPositions = {
    indexedTitle: [],
    title: [],
    author: [],
  }

  // Tokenize the query
  const queryTokens = query
    .toLowerCase()
    .split(/[-()#\s^]+/)
    .filter(Boolean)

  // For each field, find positions of matching tokens
  const fields: (keyof SearchResult)[] = [
    'indexedTitle',
    'title',
    'author',
  ]

  for (const field of fields) {
    const fieldValue = document[field] || ''
    const lowerFieldValue = fieldValue.toLowerCase()

    for (const token of queryTokens) {
      let startIndex = 0
      let index = lowerFieldValue.indexOf(token, startIndex)

      while (index !== -1) {
        // Check if this is a word boundary match
        const beforeChar = index > 0 ? lowerFieldValue[index - 1] : ' '
        const afterChar
          = index + token.length < lowerFieldValue.length
            ? lowerFieldValue[index + token.length]
            : ' '

        // Match if at word boundary or after special chars
        if (
          /[-()#\s^]/.test(beforeChar || '')
          || /[-()#\s^]/.test(afterChar || '')
          || index === 0
        ) {
          positions[field]?.push({
            start: index,
            length: token.length,
          })
        }

        startIndex = index + 1
        index = lowerFieldValue.indexOf(token, startIndex)
      }
    }
  }

  return positions
}
