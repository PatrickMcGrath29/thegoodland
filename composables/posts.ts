import type { Post } from '~/types'

export async function usePosts(): Promise<Post[]> {
  return await queryContent<Post>('posts').find()
}

export async function usePost(postId: string): Promise<Post> {
  return await queryContent<Post>('posts').where({ uuid: postId }).findOne()
}
