import type { ParsedContent } from '@nuxt/content/types'
import type { Post } from '~/types'

function getPath(record: any): string {
  return record._path.split('/').at(-1) as string
}

function toPost(record: any): Post {
  return {
    ...record,
    path: getPath(record),
    createdDate: new Date(record.createdDate),
  }
}

export async function usePosts(limit: number | null = null): Promise<Post[]> {
  const query = queryContent<Post>('posts').sort({ createdDate: -1, $numeric: true })

  if (limit !== null)
    query.limit(limit)

  const posts = await query.find()
  return posts.map(toPost)
}

export async function usePost(postPath: string): Promise<Post> {
  const post = await queryContent<Post>('posts').where({ _path: `/posts/${postPath}` }).findOne()

  return toPost(post)
}
