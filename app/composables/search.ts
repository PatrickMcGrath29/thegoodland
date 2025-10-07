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

export function markHints(result) {
  const hints = {}

  result.terms.forEach((term) => {
    const regexp = new RegExp(`(${term})`, 'gi')

    result.match[term].forEach((field) => {
      const value = result[field]

      if (typeof value === 'string') {
        hints[field] = value.replace(regexp, '<mark>$1</mark>')
      }
      else if (field === 'headings') {
        const markedValue = value.reduce((items, h) => {
          if (h.title.toLowerCase().includes(term)) {
            items.push({
              id: h.id,
              title: h.title.replace(regexp, '<mark>$1</mark>'),
            })
          }
          return items
        }, [])
        hints[field] = markedValue.length ? markedValue : null
      }
    })
  })

  return hints
}
