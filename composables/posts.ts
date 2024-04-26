import { getPath } from './utils'
import type { Post } from '~/types'

function toPost(record: any): Post {
  return {
    ...record,
    path: getPath(record),
    createdDate: new Date(record.createdDate),
  }
}

export async function useBlogPosts(limit: number | null = null): Promise<Post[]> {
  const query = queryContent<Post>('posts').where({ isBlogPost: true }).sort({ createdDate: -1, $numeric: true })

  if (limit !== null)
    query.limit(limit)

  const posts = await query.find()
  return posts.map(toPost)
}

export async function usePost(postPath: string): Promise<Post> {
  const post = await queryContent<Post>('posts').where({ _path: `/posts/${postPath}` }).findOne()

  return toPost(post)
}

export async function usePostsBySlug(slugs: string[]): Promise<Post[]> {
  const posts = await queryContent<Post>('posts').where({ slug: { $in: slugs } }).find()

  // Reorder posts based on the ordering of slugs in the slugs argument
  posts.sort((a, b) => slugs.indexOf(a.slug) - slugs.indexOf(b.slug))

  return posts.map(toPost)
}
