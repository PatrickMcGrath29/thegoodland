import type { Post } from '~/types'

export async function usePosts(limit: number | null = null): Promise<Post[]> {
  const query = queryContent<Post>('posts').sort({ createdDate: -1, $numeric: true })

  if (limit !== null)
    query.limit(limit)

  return await query.find()
}

export async function usePost(postId: string): Promise<Post> {
  return await queryContent<Post>('posts').where({ uuid: postId }).findOne()
}
