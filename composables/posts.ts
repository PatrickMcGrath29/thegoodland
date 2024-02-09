import type { Post } from '~/types'

export async function usePosts() {
  const posts = await queryContent('posts').find()

  return posts
}

export async function usePost(postId: string) {
  const post = await queryContent('posts').where({ uuid: postId }).findOne()

  return post
}
