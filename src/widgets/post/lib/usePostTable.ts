import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useLocation } from "react-router-dom"
import { PostsParams } from "../../../entities/post/model/types"
import { postWithAuthorQueries } from "../../../features/post/api/queries"

export const usePostTable = () => {
  const location = useLocation()
  const queryClient = useQueryClient()
  const queryParams = new URLSearchParams(location.search)

  const tag = queryParams.get("tag") || ""
  const limit = queryParams.get("limit") || "10"
  const skip = queryParams.get("skip") || "0"
  const sortBy = queryParams.get("sortBy") || ""
  const order = queryParams.get("order") || "asc"
  const search = queryParams.get("search") || ""

  const params: PostsParams = { tag, limit, skip, sortBy, order, search }
  const { data: cachedData, isLoading } = useQuery(postWithAuthorQueries.list(queryClient, params))

  return {
    data: cachedData?.data || [],
    total: cachedData?.total || 0,
    isLoading,
    search,
  }
}
