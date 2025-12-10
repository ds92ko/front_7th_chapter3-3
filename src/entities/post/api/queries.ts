import { queryOptions } from "@tanstack/react-query"
import { PostsParams } from "../model/types"
import { getPosts } from "./api"

export const postQueries = {
  all: ["posts"] as const,
  list: (params: PostsParams) =>
    queryOptions({
      queryKey: [...postQueries.all, params],
      queryFn: () => getPosts(params),
    }),
}
