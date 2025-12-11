import { queryOptions } from "@tanstack/react-query"
import { getComments } from "./api"

export const commentQueries = {
  all: ["comments"] as const,
  list: (id: number) =>
    queryOptions({
      queryKey: [...commentQueries.all, "post", id],
      queryFn: () => getComments(id),
    }),
}
