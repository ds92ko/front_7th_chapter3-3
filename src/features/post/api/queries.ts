import { QueryClient, queryOptions } from "@tanstack/react-query"
import { postQueries } from "../../../entities/post/api/queries"
import { PostsParams } from "../../../entities/post/model/types"
import { userQueries } from "../../../entities/user/api/queries"
import { PostWithAuthorResponse } from "../model/types"

export const postWithAuthorQueries = {
  all: ["postWithAuthor"] as const,
  list: (queryClient: QueryClient, params: PostsParams) =>
    queryOptions({
      queryKey: [...postWithAuthorQueries.all],
      queryFn: async () => {
        const { posts, total } = await queryClient.ensureQueryData(postQueries.list(params))
        const { users } = await queryClient.ensureQueryData(userQueries.list())

        const processedData = posts.map((post) => ({
          ...post,
          author: users.find((user) => user.id === post.userId),
        }))

        return {
          data: processedData,
          total,
        }
      },
    }),
  detail: (queryClient: QueryClient, id: number | null) =>
    queryOptions({
      queryKey: [...postWithAuthorQueries.all, id],
      queryFn: async () => {
        if (id === null) throw new Error("Post ID is required")

        const cachedData = queryClient.getQueryData<PostWithAuthorResponse>(postWithAuthorQueries.all)

        if (!cachedData) throw new Error(`Post with id ${id} not found: list data not cached`)

        const selectedPost = cachedData.data.find((post) => post.id === id)

        if (!selectedPost) throw new Error(`Post with id ${id} not found`)

        return selectedPost
      },
      enabled: id !== null,
    }),
}
