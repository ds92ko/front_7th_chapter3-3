import { queryOptions } from "@tanstack/react-query"
import { getUser, getUsers } from "./api"

export const userQueries = {
  all: ["users"] as const,
  list: () =>
    queryOptions({
      queryKey: [...userQueries.all],
      queryFn: getUsers,
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: [...userQueries.all, id],
      queryFn: () => getUser(id),
    }),
}
