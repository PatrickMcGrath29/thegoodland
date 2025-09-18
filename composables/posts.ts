import type { Author, Post } from '~/types'

function toPost(record: any): Post {
  return {
    ...record,
    createdDate: new Date(record.createdDate),
  }
}

export async function useAllPosts(limit: number | null = null): Promise<Post[]> {
  let query = queryCollection('posts').order('createdDate', 'DESC')

  if (limit !== null)
    query = query.limit(limit)

  const posts = await query.all()
  return posts.map(toPost)
}

export async function useBlogPosts(limit: number | null = null): Promise<Post[]> {
  let query = queryCollection('posts').where('isBlogPost', '=', true).order('createdDate', 'DESC')

  if (limit !== null)
    query = query.limit(limit)

  const posts = await query.all()
  return posts.map(toPost)
}

export async function usePost(slug: string): Promise<Post> {
  const post = await queryCollection('posts').where('slug', '=', slug).first()

  return toPost(post)
}

export async function usePostsBySlug(slugs: string[]): Promise<Post[]> {
  const posts = await queryCollection('posts').where('slug', 'IN', slugs).all()

  // Reorder posts based on the ordering of slugs in the slugs argument
  posts.sort((a, b) => slugs.indexOf(a.slug) - slugs.indexOf(b.slug))

  return posts.map(toPost)
}

export async function useAuthorByName(name: string): Promise<Author | null> {
  const author = await queryCollection('authors').where('name', '=', name).first()

  if (!author)
    return null

  return author as Author
}
