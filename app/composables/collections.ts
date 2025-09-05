import type { Collection } from '~/types'

function toCollection(record: any): Collection {
  return {
    ...record,
    posts: record.posts.map(({ post }: any) => post),
  }
}

export async function useCollections(): Promise<Collection[]> {
  const collections = await queryCollection<Collection>('collections')
    .all()

  return collections.map(toCollection)
}

export async function useCollection(collectionPath: string): Promise<Collection> {
  const collection = await queryCollection<Collection>('collections')
    .where('slug', '=', collectionPath)
    .first()

  return toCollection(collection)
}

export async function useCollectionsMetadata(): Promise<Collection[]> {
  const collections = (await queryCollection<Collection>('collections')
    .all()).map(toCollection)

  return collections.sort((a, b) => a.name.localeCompare(b.name))
}

export async function useCollectionInfoForPost(slug: string): Promise<Collection[]> {
  const collections = (await queryCollection<Collection>('collections')
    .all()).map(toCollection)
  return collections.filter(collection => collection.posts.includes(slug))
}
