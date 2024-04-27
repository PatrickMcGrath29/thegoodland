import type { Collection } from '~/types'

function toCollection(record: any): Collection {
  return {
    ...record,
    posts: record.posts.map(({ post }: any) => post),
  }
}

export async function useCollections(): Promise<Collection[]> {
  const collections = await queryContent<Collection>('collections').find()
  return collections.map(toCollection)
}

export async function useCollection(collectionPath: string): Promise<Collection> {
  const collection = await queryContent<Collection>('collections').where({ _path: `/collections/${collectionPath}` }).findOne()

  return toCollection(collection)
}
