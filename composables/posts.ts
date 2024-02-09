import type { PostPreview } from '~/types'

export async function usePostPreviews() {
  const posts = await queryContent('posts').find()

  return posts
}
