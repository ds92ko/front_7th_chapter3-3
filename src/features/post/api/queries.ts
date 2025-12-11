import { QueryClient, queryOptions } from "@tanstack/react-query"
import { postQueries } from "../../../entities/post/api/queries"
import { PostsParams } from "../../../entities/post/model/types"
import { userQueries } from "../../../entities/user/api/queries"

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
}
