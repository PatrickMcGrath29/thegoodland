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
    return width.value < 768
  })
}

export async function consistentHash<T>(
  records: [T, ...T[]],
  recordKeyFn: (item: T) => number | string,
  pickKey: number | string,
): Promise<T> {
  const hashedKey = await hashString(pickKey)

  const computeDelta = async (rec: T): Promise<number> => {
    const hashedRecordKey = await hashString(recordKeyFn(rec))
    return Math.abs(stringToNumber(hashedRecordKey) - stringToNumber(hashedKey))
  }

  let currentMin: T = records[0]
  let currentMinDelta = await computeDelta(records[0])

  for (const rec of records) {
    const delta = await computeDelta(rec)
    if (delta < currentMinDelta) {
      currentMinDelta = delta
      currentMin = rec
    }
  }

  return currentMin
}

export function stringToNumber(value: string | number) {
  let hash = 0
  for (const char of value.toString()) {
    hash = (hash << 5) - hash + char.charCodeAt(0)
    hash |= 0
  }
  return hash
}

async function hashString(inputString: string | number) {
  const encoder = new TextEncoder()
  const data = encoder.encode(inputString.toString())
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)

  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')

  return hashHex
}
