import { queryOptions } from "@tanstack/react-query"
import { PostsResponse } from "../../../entities/post/model/types"
import { UsersResponse } from "../../../entities/user/model/types"

export const postWithAuthorQueries = {
  all: ["postWithAuthor"] as const,
  list: (posts?: PostsResponse, users?: UsersResponse) =>
    queryOptions({
      queryKey: [...postWithAuthorQueries.all],
      queryFn: () => {
        const processedData =
          posts?.posts.map((post) => ({
            ...post,
            author: users?.find((user) => user.id === post.userId),
          })) || []
        return {
          data: processedData,
          total: posts?.total ?? 0,
        }
      },
      enabled: !!posts && !!users,
    }),
}
