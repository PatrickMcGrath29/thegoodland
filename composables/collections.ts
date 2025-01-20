import type { Collection } from '~/types'

function toCollection(record: any): Collection {
  return {
    ...record,
    posts: record.posts.map(({ post }: any) => post),
  }
}

export async function useCollections(): Promise<Collection[]> {
  const collections = await queryCollection('collections').all()
  return collections.map(toCollection)
}

export async function useCollection(slug: string): Promise<Collection> {
  const collection = await queryCollection('collections').where('slug', '=', slug).first()

  return toCollection(collection)
}

export async function useCollectionInfoForPost(slug: string): Promise<Collection | undefined> {
  const collections = (await queryCollection('collections').all()).map(toCollection)
  const matchingCollection = collections.find(collection => collection.posts.includes(slug))

  return matchingCollection
}
