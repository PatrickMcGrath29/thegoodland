interface MDCNode {
  type: string
  value?: string
}

interface MDCElement extends MDCNode {
  tag?: string
  children?: MDCNode[]
}

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
    text += (node as MDCElement).children?.map((child: MDCNode) => extractTextFromAst(child, ignoredTags)).filter(Boolean).join('') || ''
  }

  return text
}
