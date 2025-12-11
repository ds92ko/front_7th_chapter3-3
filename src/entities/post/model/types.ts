export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
}

export interface PostsResponse {
  posts: Post[]
  skip: number
  limit: number
  total: number
}

export interface PostsParams extends Record<string, string | number> {
  limit: string
  skip: string
  sortBy: string
  order: string
}
